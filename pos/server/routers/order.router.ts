import express from 'express'
import {
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    updateOrderWithCustomerIdController,
    deleteOrderByIdController,
    getAllRestaurantOrdersController,
    updateOrderStatus,
    updateOrderItems,
    generateOrderForTable,
    updateOrderChef
} from '../controllers/order.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/all', authMiddleware, getAllRestaurantOrdersController);
router.put('/status/:orderId', authMiddleware, updateOrderStatus);
router.put('/items/:orderId', authMiddleware, updateOrderItems);
router.get('/log/table/:id', authMiddleware, generateOrderForTable);
router.put('/chef/:orderId', authMiddleware, updateOrderChef);
// router.get('/:id', getOrderByIdController);
router.post('/', authMiddleware, createOrderController);
router.put('/:id', updateOrderByIdController);
router.put('/:orderId/add-customerid/:customerId', updateOrderWithCustomerIdController);

export default router;
