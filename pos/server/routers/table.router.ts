import express from 'express'
import {
    getAllTablesController,
    getTableByIdController,
    createTableController,
    updateTableByIdController,
    deleteTableByIdController,
    occcupyTableByIdController,
    unoccupyTableByIdController
} from '../controllers/table.controller';

const router = express.Router();

router.get('/', getAllTablesController);
router.get('/:id', getTableByIdController);
router.post('/', createTableController);
router.put('/:id', updateTableByIdController);
router.delete('/:id', deleteTableByIdController);
router.put('/table-occupy/:id', occcupyTableByIdController);
router.put('/table-open/:id', unoccupyTableByIdController);

export default router;