import express from 'express'
import {
    getAllTablesController,
    getTableByIdController,
    createTableController,
    updateTableByIdController,
    deleteTableByIdController,
    setTableAsOccupiedController
} from '../controllers/table.controller';

const router = express.Router();

router.get('/', getAllTablesController);
router.get('/:id', getTableByIdController);
router.post('/', createTableController);
router.put('/:id', updateTableByIdController);
router.put('/settable/:id', setTableAsOccupiedController);
router.delete('/:id', deleteTableByIdController);

export default router;