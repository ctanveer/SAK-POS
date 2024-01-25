import express from 'express';
import {postWaiterDataToHRController, getPopulatedTableLogByOrderIdController} from '../controllers/hr.controller'
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/waiter-data', authMiddleware, postWaiterDataToHRController);
router.get('/table-log-data/:id', getPopulatedTableLogByOrderIdController)

export default router;