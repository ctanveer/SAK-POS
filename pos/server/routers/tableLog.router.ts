import express from 'express'
import {
    getAllTableLogsController,
    getTableLogsByTableIdController,
    createTableLogController,
    updateTableLogByIdController
} from '../controllers/tableLog.controller';

const router = express.Router();

router.get('/', getAllTableLogsController);
router.get('/:id', getTableLogsByTableIdController);
// router.post('/:id', createTableLogController);
router.post('/', createTableLogController);
router.put('/:id', updateTableLogByIdController)

export default router;