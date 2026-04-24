import { Request, Response } from 'express';
import { query } from '../config/db.js.js';

// User Management
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['admin', 'student', 'instructor'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const result = await query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, full_name, role',
      [role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user role' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Stats for dashboard
export const getSystemStats = async (req: Request, res: Response) => {
  try {
    const userCount = await query('SELECT COUNT(*) FROM users');
    const courseCount = await query('SELECT COUNT(*) FROM courses');
    const enrollmentCount = await query('SELECT COUNT(*) FROM enrollments');
    const submissionCount = await query('SELECT COUNT(*) FROM submissions');

    res.json({
      users: parseInt(userCount.rows[0].count),
      courses: parseInt(courseCount.rows[0].count),
      enrollments: parseInt(enrollmentCount.rows[0].count),
      submissions: parseInt(submissionCount.rows[0].count),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

// Enrollment Management
export const enrollStudent = async (req: Request, res: Response) => {
  const { user_id, course_id } = req.body;
  try {
    await query(
      'INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [user_id, course_id]
    );
    res.json({ message: 'Student enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error enrolling student' });
  }
};

export const unenrollStudent = async (req: Request, res: Response) => {
  const { user_id, course_id } = req.body;
  try {
    await query('DELETE FROM enrollments WHERE user_id = $1 AND course_id = $2', [user_id, course_id]);
    res.json({ message: 'Student unenrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error unenrolling student' });
  }
};

export const getCourseEnrollments = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const result = await query(
      'SELECT u.id, u.email, u.full_name FROM users u JOIN enrollments e ON u.id = e.user_id WHERE e.course_id = $1',
      [courseId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching enrollments' });
  }
};
