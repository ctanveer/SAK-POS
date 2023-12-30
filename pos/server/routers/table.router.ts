import express from 'express'
import {
    getAllTablesController,
    getTableByIdController,
    createTableController,
    updateTableByIdController,
    deleteTableByIdController,
    setTableAsOccupiedController,
    closeAndUnoccupyTableController
} from '../controllers/table.controller';

const router = express.Router();

router.get('/', getAllTablesController);
router.get('/:id', getTableByIdController);
router.post('/', createTableController);
router.put('/:id', updateTableByIdController);
router.put('/set-table/:id', setTableAsOccupiedController);
router.put('/close-table/:id', closeAndUnoccupyTableController);
router.delete('/:id', deleteTableByIdController);

export default router;