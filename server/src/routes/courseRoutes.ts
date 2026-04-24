import { Router } from 'express';
import { 
  createCourse, 
  getAllCourses, 
  getCourseById, 
  deleteCourse,
  addSection,
  deleteSection,
  toggleSectionLock,
  addContentItem,
  updateContentItem,
  deleteContentItem,
  markLessonComplete,
  submitAssignment,
  gradeSubmission,
  getSubmissionsByLesson
} from '../controllers/courseController.js';
import { authenticateToken } from '../middleware/auth.js';
import { isAdmin } from '../middleware/adminAuth.js';

const router = Router();

// Specific routes first
router.get('/', authenticateToken, getAllCourses);

// Admin only management routes
router.post('/', authenticateToken, isAdmin, createCourse);
router.post('/sections', authenticateToken, isAdmin, addSection);
router.patch('/sections/:id/lock', authenticateToken, isAdmin, toggleSectionLock);
router.delete('/sections/:id', authenticateToken, isAdmin, deleteSection);
router.post('/items', authenticateToken, isAdmin, addContentItem);
router.put('/items/:id', authenticateToken, isAdmin, updateContentItem);
router.delete('/items/:id', authenticateToken, isAdmin, deleteContentItem);

// Submission and Grading (Mixed Access)
router.post('/items/submit', authenticateToken, submitAssignment);
router.post('/items/complete', authenticateToken, markLessonComplete);
router.get('/items/:lessonId/submissions', authenticateToken, isAdmin, getSubmissionsByLesson);
router.put('/submissions/:id/grade', authenticateToken, isAdmin, gradeSubmission);

// Generic ID routes last to avoid capturing specific words like "items" or "sections"
router.get('/:id', authenticateToken, getCourseById);
router.delete('/:id', authenticateToken, isAdmin, deleteCourse);

export default router;
