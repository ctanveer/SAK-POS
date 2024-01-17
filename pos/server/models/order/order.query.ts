import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import { Types } from "mongoose";

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

const getAllOrdersByRestaurantId = async (restaurantId: number) => {
    try {
        const orders = await Order.find({ restaurantId, orderPosted: { $exists: true } });
        return orders;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting orders from DB.');
    }
}

const getOrderById = async (id: string | Types.ObjectId) => {
    try {
        const order = await Order.findById(id)
        return order;
    } catch (error) {
        throw new Error((error as Error).message);
    }
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
        orderId,
        {
            $set: {...orderObject},
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
    updateOrderWithCustomerId,
    getAllOrdersByRestaurantId
}