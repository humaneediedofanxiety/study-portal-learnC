import { Request, Response } from 'express';
import { query } from '../config/db.js.js';

interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}

// Assignment Management
export const createAssignment = async (req: Request, res: Response) => {
  const { course_id, title, description, deadline } = req.body;
  try {
    const result = await query(
      'INSERT INTO assignments (course_id, title, description, deadline) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_id, title, description, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating assignment' });
  }
};

export const getAssignmentsByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const result = await query('SELECT * FROM assignments WHERE course_id = $1 ORDER BY created_at DESC', [courseId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
};

// Submission Management
export const submitAssignment = async (req: AuthRequest, res: Response) => {
  const { assignment_id, file_url, content } = req.body;
  const student_id = req.user?.id;

  try {
    const result = await query(
      'INSERT INTO submissions (assignment_id, student_id, file_url, content) VALUES ($1, $2, $3, $4) RETURNING *',
      [assignment_id, student_id, file_url, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting assignment' });
  }
};

export const getSubmissions = async (req: Request, res: Response) => {
  const { assignmentId } = req.params;
  try {
    const result = await query(`
      SELECT s.*, u.full_name as student_name, u.email as student_email 
      FROM submissions s
      JOIN users u ON s.student_id = u.id
      WHERE s.assignment_id = $1
    `, [assignmentId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

export const gradeSubmission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grade, feedback } = req.body;
  try {
    const result = await query(
      'UPDATE submissions SET grade = $1, feedback = $2 WHERE id = $3 RETURNING *',
      [grade, feedback, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error grading submission' });
  }
};
