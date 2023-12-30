"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.default.Router();
router.get('/', order_controller_1.getAllOrdersController);
router.get('/:id', order_controller_1.getOrderByIdController);
router.post('/', order_controller_1.createOrderController);
router.put('/:id', order_controller_1.updateOrderByIdController);
router.put('/:orderId/add-customer/:customerId', order_controller_1.updateOrderWithCustomerIdController);
router.delete('/:id', order_controller_1.deleteOrderByIdController);
exports.default = router;
