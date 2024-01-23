import express from 'express'
import {
    getAllTablesController,
    getTableByIdController,
    createTableController,
    updateTableByIdController,
    deleteTableByIdController,
    occcupyTableByIdController,
    unoccupyTableByIdController,
    getTablesOfAllRestaurantsController
} from '../controllers/table.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, getAllTablesController);
router.get('/all-restaurant-tables', getTablesOfAllRestaurantsController);
router.get('/:id', getTableByIdController);
router.post('/', authMiddleware, createTableController);
router.put('/:id', updateTableByIdController);
router.delete('/:id', deleteTableByIdController);
router.put('/table-occupy/:id', occcupyTableByIdController);
router.put('/table-open/:id', unoccupyTableByIdController);

export default router;