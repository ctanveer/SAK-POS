import express from 'express'
import {
    getAllOrdersController,
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    updateOrderWithCustomerIdController,
    deleteOrderByIdController,
    sendOrderToKDS
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getAllOrdersController);
router.get('/:id', getOrderByIdController);
router.post('/', createOrderController);
router.put('/:id', updateOrderByIdController);
router.put('/:orderId/add-customerid/:customerId', updateOrderWithCustomerIdController);
router.delete('/:id', deleteOrderByIdController);
router.post('/new', authMiddleware, sendOrderToKDS)

export default router;
