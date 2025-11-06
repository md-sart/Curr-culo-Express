import { Router } from 'express';
import userRoutes from './userRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import educationRoutes from './educationRoutes.js';
import skillRoutes from './skillRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/experiences', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/skills', skillRoutes);

export default router;
