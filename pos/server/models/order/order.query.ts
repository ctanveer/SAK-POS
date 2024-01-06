import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

const getOrderById = async (id: string) => {
    const order = await Order.findById(id)
    return order;
};

const createOrder = async (orderObject: IOrder) => {
    const order = await Order.create({...orderObject});
    return order;
}

const updateOrderById = async (
    orderId: string,
    orderObject: Partial<IOrder>,
 ) => {
    const order = await Order.findByIdAndUpdate(
        { _id: orderId },
        {
            ...orderObject,
        },
        { new: true },
    );
    return order
};

const deleteOrderById = async (id: string) => {
    const order = await Order.findByIdAndDelete(id);
    return order;
};

const updateOrderWithCustomerId = async (
    orderId: string,
    customerId: number
) => {
    let order = await Order.findOne({orderId: orderId});
    if (order) {
        order.customerId = customerId;
        order = await order.save();
    }
    return order;

}

export {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    updateOrderWithCustomerId
}