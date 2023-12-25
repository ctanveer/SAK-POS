"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderById = exports.updateOrderById = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const order_model_1 = __importDefault(require("./order.model"));
//import CounterOrderModel from "./counter.order.model";
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find();
    return orders;
});
exports.getAllOrders = getAllOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOne({ orderId: id });
    return order;
});
exports.getOrderById = getOrderById;
const createOrder = (orderObject) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.create(Object.assign({}, orderObject));
    return order;
});
exports.createOrder = createOrder;
const updateOrderById = (orderId, orderObject) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOneAndUpdate({ orderId: orderId }, Object.assign({}, orderObject), { new: true });
    return order;
});
exports.updateOrderById = updateOrderById;
const deleteOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOneAndDelete({ orderId: id });
    return order;
});
exports.deleteOrderById = deleteOrderById;
