import express from 'express'
import {
    getAllTablesController,
    getTableByIdController,
    createTableController,
    updateTableByIdController,
    deleteTableByIdController
} from '../controllers/table.controller';

const router = express.Router();

router.get('/', getAllTablesController);
router.get('/:id', getTableByIdController);

router.post('/', createTableController);
router.put('/:id', updateTableByIdController);
router.delete('/:id', deleteTableByIdController);

export default router;