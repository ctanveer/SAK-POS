import express from 'express'
import {
    getAllTableLogsController,
    getTableLogsByTableIdController,
    createTableLogController
} from '../controllers/tableLog.controller';

const router = express.Router();

router.get('/', getAllTableLogsController);
router.get('/:id', getTableLogsByTableIdController);
// router.post('/:id', createTableLogController);
router.post('/', createTableLogController);

export default router;