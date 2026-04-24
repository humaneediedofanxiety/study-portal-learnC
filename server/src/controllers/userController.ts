import { Request, Response } from 'express';
import { query } from '../config/db.js.js';

interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export const getUserAssignments = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await query(
      `SELECT l.*, c.id as course_id, c.title as course_title 
       FROM lessons l
       JOIN course_sections s ON l.section_id = s.id
       JOIN courses c ON s.course_id = c.id
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.user_id = $1 AND l.type = 'assignment'
       ORDER BY l.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
};

export const getUserExams = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await query(
      `SELECT l.*, c.id as course_id, c.title as course_title 
       FROM lessons l
       JOIN course_sections s ON l.section_id = s.id
       JOIN courses c ON s.course_id = c.id
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.user_id = $1 AND l.type = 'exam'
       ORDER BY l.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching exams' });
  }
};

export const getUserSchedule = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await query(
      `SELECT l.*, c.id as course_id, c.title as course_title 
       FROM lessons l
       JOIN course_sections s ON l.section_id = s.id
       JOIN courses c ON s.course_id = c.id
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.user_id = $1 AND l.type = 'live'
       ORDER BY l.created_at ASC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching schedule' });
  }
};

export const getUserResources = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  try {
    const result = await query(
      `SELECT l.*, c.id as course_id, c.title as course_title 
       FROM lessons l
       JOIN course_sections s ON l.section_id = s.id
       JOIN courses c ON s.course_id = c.id
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.user_id = $1 AND (l.type = 'resource' OR l.type = 'note')
       ORDER BY l.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching resources' });
  }
};
