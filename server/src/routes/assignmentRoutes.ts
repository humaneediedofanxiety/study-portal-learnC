import { Router } from 'express';
import { createAssignment, getAssignmentsByCourse, submitAssignment, getSubmissions, gradeSubmission } from '../controllers/assignmentController.js';
import { authenticateToken } from '../middleware/auth.js';
import { isAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.get('/course/:courseId', authenticateToken, getAssignmentsByCourse);
router.post('/submit', authenticateToken, submitAssignment);

// Admin/Instructor routes
router.post('/', authenticateToken, isAdmin, createAssignment);
router.get('/:assignmentId/submissions', authenticateToken, isAdmin, getSubmissions);
router.put('/submissions/:id/grade', authenticateToken, isAdmin, gradeSubmission);

export default router;
