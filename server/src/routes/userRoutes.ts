import { Router } from 'express';
import { getUserAssignments, getUserExams, getUserSchedule, getUserResources } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/assignments', authenticateToken, getUserAssignments);
router.get('/exams', authenticateToken, getUserExams);
router.get('/schedule', authenticateToken, getUserSchedule);
router.get('/resources', authenticateToken, getUserResources);

export default router;
