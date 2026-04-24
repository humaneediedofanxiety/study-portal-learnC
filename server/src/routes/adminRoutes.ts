import { Router } from 'express';
import { getAllUsers, updateUserRole, deleteUser, getSystemStats, enrollStudent, unenrollStudent, getCourseEnrollments } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/auth.js';
import { isAdmin } from '../middleware/adminAuth.js';

const router = Router();

// All routes here require admin privileges
router.use(authenticateToken);
router.use(isAdmin);

router.get('/stats', getSystemStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Student Management / Enrollments
router.post('/enroll', enrollStudent);
router.post('/unenroll', unenrollStudent);
router.get('/enrollments/:courseId', getCourseEnrollments);

export default router;
