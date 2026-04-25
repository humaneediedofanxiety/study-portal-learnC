import { Request, Response } from 'express';
import { query } from '../config/db.js';

interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}

// Course CRUD
export const createCourse = async (req: AuthRequest, res: Response) => {
  const { title, description, thumbnail_url } = req.body;
  try {
    const result = await query(
      'INSERT INTO courses (title, description, thumbnail_url) VALUES ($1, $2, $3) RETURNING *',
      [title, description, thumbnail_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating course' });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM courses ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

export const getCourseById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const userRole = req.user?.role;

  if (isNaN(parseInt(id as string))) {
    return res.status(400).json({ message: 'Invalid course ID format' });
  }

  try {
    const courseResult = await query('SELECT * FROM courses WHERE id = $1', [id]);
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Access Control Check
    let hasAccess = false;
    if (userRole === 'admin') {
      hasAccess = true;
    } else {
      const enrollment = await query('SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2', [userId, id]);
      if (enrollment.rows.length > 0) {
        hasAccess = true;
      }
    }

    const sectionsResult = await query(
      'SELECT * FROM course_sections WHERE course_id = $1 ORDER BY order_index ASC',
      [id]
    );

    const sections = sectionsResult.rows;

    let contentResult;
    try {
      contentResult = await query(
        `SELECT l.*, 
         (SELECT COUNT(*) FROM lesson_completions lc WHERE lc.lesson_id = l.id AND lc.user_id = $2) > 0 as is_completed,
         (SELECT row_to_json(s.*) FROM submissions s WHERE s.lesson_id = l.id AND s.student_id = $2) as user_submission
         FROM lessons l 
         JOIN course_sections s ON l.section_id = s.id 
         WHERE s.course_id = $1 
         ORDER BY l.order_index ASC`,
        [id, userId]
      );
    } catch (queryError) {
      console.error('Error fetching course content items:', queryError);
      // Fallback: Fetch lessons without completion/submission info if the above fails
      // This helps diagnose if the issue is with lesson_completions or submissions tables
      contentResult = await query(
        `SELECT l.* FROM lessons l 
         JOIN course_sections s ON l.section_id = s.id 
         WHERE s.course_id = $1 
         ORDER BY l.order_index ASC`,
        [id]
      );
    }

    const sectionsWithContent = sections.map(section => {
      const isLockedForStudent = userRole !== 'admin' && section.is_locked;
      const allItems = contentResult.rows.filter(item => item.section_id === section.id);
      
      const items = allItems.map(item => {
        if (isLockedForStudent) {
          // Return restricted version of the item
          return {
            id: item.id,
            section_id: item.section_id,
            title: item.title,
            type: item.type,
            is_locked: true, // Signal to frontend that content is locked
            order_index: item.order_index
          };
        }
        return item;
      });

      return {
        ...section,
        is_locked: section.is_locked,
        items: items
      };
    });

    res.json({
      ...courseResult.rows[0],
      hasAccess,
      sections: sectionsWithContent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching course details' });
  }
};

// Section Management
export const addSection = async (req: Request, res: Response) => {
  const { course_id, title, order_index, is_locked } = req.body;
  try {
    const result = await query(
      'INSERT INTO course_sections (course_id, title, order_index, is_locked) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_id, title, order_index || 0, is_locked !== undefined ? is_locked : true]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding section' });
  }
};

export const toggleSectionLock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { is_locked } = req.body;
  try {
    const result = await query(
      'UPDATE course_sections SET is_locked = $1 WHERE id = $2 RETURNING *',
      [is_locked, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error toggling section lock' });
  }
};

// ... existing deleteSection ...

// Lesson Completion
export const markLessonComplete = async (req: AuthRequest, res: Response) => {
  const { lessonId } = req.body;
  const userId = req.user?.id;
  try {
    await query(
      'INSERT INTO lesson_completions (user_id, lesson_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, lessonId]
    );
    res.json({ message: 'Lesson marked as complete' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking lesson complete' });
  }
};

// Submissions
export const submitAssignment = async (req: AuthRequest, res: Response) => {
  const { lesson_id, file_url, content } = req.body;
  const userId = req.user?.id;
  try {
    const result = await query(
      `INSERT INTO submissions (lesson_id, student_id, file_url, content) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (lesson_id, student_id) 
       DO UPDATE SET file_url = $3, content = $4, submitted_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [lesson_id, userId, file_url, content]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting assignment' });
  }
};

export const gradeSubmission = async (req: Request, res: Response) => {
  const { id } = req.params; // submission id
  const { grade, feedback } = req.body;
  try {
    const result = await query(
      'UPDATE submissions SET grade = $1, feedback = $2 WHERE id = $3 RETURNING *',
      [grade, feedback, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error grading submission' });
  }
};

export const getSubmissionsByLesson = async (req: Request, res: Response) => {
  const { lessonId } = req.params;
  try {
    const result = await query(
      `SELECT s.*, u.full_name as student_name, u.email as student_email 
       FROM submissions s
       JOIN users u ON s.student_id = u.id
       WHERE s.lesson_id = $1`,
      [lessonId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(parseInt(id as string))) {
    return res.status(400).json({ message: 'Invalid section ID format' });
  }
  try {
    const result = await query('DELETE FROM course_sections WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Section not found' });
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting section' });
  }
};

// Content Item Management
export const addContentItem = async (req: Request, res: Response) => {
  const { section_id, title, type, content, file_url, schedule_config, order_index } = req.body;
  try {
    const result = await query(
      `INSERT INTO lessons (section_id, title, type, content, file_url, schedule_config, order_index) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [section_id, title, type, content, file_url, schedule_config, order_index || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding content item' });
  }
};

export const updateContentItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, file_url, schedule_config, order_index } = req.body;

  if (isNaN(parseInt(id as string))) {
    return res.status(400).json({ message: 'Invalid item ID format' });
  }

  try {
    const result = await query(
      `UPDATE lessons SET title = $1, content = $2, file_url = $3, schedule_config = $4, order_index = $5 
       WHERE id = $6 RETURNING *`,
      [title, content, file_url, schedule_config, order_index, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating content item' });
  }
};

export const deleteContentItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(parseInt(id as string))) {
    return res.status(400).json({ message: 'Invalid item ID format' });
  }
  try {
    const result = await query('DELETE FROM lessons WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isNaN(parseInt(id as string))) {
    return res.status(400).json({ message: 'Invalid course ID format' });
  }
  try {
    const result = await query('DELETE FROM courses WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting course' });
  }
};
