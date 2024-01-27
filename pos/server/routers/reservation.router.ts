import express from 'express'
import {
    getAllReservationsForTodayController,
    getAllReservationsController,
    updateReservationStatusContrller
} from '../controllers/reservation.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/today/:id', authMiddleware, getAllReservationsForTodayController);
router.get('/all/:id', authMiddleware, getAllReservationsController);
router.put('/status-update/:id', authMiddleware, updateReservationStatusContrller);

export default router;