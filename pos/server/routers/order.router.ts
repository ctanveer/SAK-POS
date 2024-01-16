import express from 'express'
import {
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    updateOrderWithCustomerIdController,
    deleteOrderByIdController,
    sendOrderToKDS
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { getAllOrdersByRestaurantId } from '../models/order/order.query';

const router = express.Router();

router.get('/all', authMiddleware, getAllOrdersByRestaurantId);
// router.get('/:id', getOrderByIdController);
router.post('/', authMiddleware, createOrderController);
// router.put('/:id', updateOrderByIdController);
router.put('/:orderId/add-customerid/:customerId', updateOrderWithCustomerIdController);
// router.delete('/:id', deleteOrderByIdController);
router.post('/new', authMiddleware, sendOrderToKDS)

export default router;
