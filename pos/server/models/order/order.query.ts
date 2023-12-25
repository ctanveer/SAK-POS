import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
//import CounterOrderModel from "./counter.order.model";

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

const getOrderById = async (id: number) => {
    const order = await Order.findOne({orderId: id});
    return order;
};

const createOrder = async (orderObject: IOrder) => {
    const order = await Order.create({...orderObject});
    return order;
}

const updateOrderById = async (
    orderId: number,
    orderObject: IOrder,
 ) => {
    const order = await Order.findOneAndUpdate(
        { orderId: orderId },
        {
            ...orderObject,
        },
        { new: true },
    );
    return order
};

const deleteOrderById = async (id: number) => {
    const order = await Order.findOneAndDelete ({orderId: id});
    return order;
};

export {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById
}