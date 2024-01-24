import express from 'express'
import {
    getAllTableLogsController,
    getTableLogsByTableIdController,
    createTableLogController,
    updateTableLogByIdController,
    getOngoingTableLogsByRestaurantIdController
} from '../controllers/tableLog.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/ongoing',authMiddleware, getOngoingTableLogsByRestaurantIdController);
router.get('/', getAllTableLogsController);
router.get('/:id', getTableLogsByTableIdController);
// router.post('/:id', createTableLogController);
router.post('/', createTableLogController);
router.put('/:id', updateTableLogByIdController)

export default router;