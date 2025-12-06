import express from 'express';
import { generateMealPlan } from '../controllers/mealController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateMealPlan);

export default router;

