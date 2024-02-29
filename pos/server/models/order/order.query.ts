import Order from "./order.model";
import { IOrder } from "../../interfaces/order.interface";
import { Types } from "mongoose";

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

const getAllOrdersByRestaurantId = async (restaurantId: number) => {
    try {
        const orders = await Order.find({ restaurantId, orderPosted: { $exists: true } }).sort({createdAt: -1});
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
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: {...orderObject},
            },
            { new: true },
        );
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
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


const getHourlyOrderCountFor24Hours = async (restaurantId: number) => {
    try {
        // Get the current date and time
        const currentDate = new Date();
        
        // Calculate the date and time 24 hours ago
        const twentyFourHoursAgo = new Date(currentDate);
        twentyFourHoursAgo.setHours(currentDate.getHours() - 24);

        const data = await Order.aggregate([
            {
                $match: {
                    restaurantId,
                    orderPosted: {
                        $gte: twentyFourHoursAgo
                    }
                }
            },
            {
                $group: {
                    _id: {
                        hour: { $hour: "$orderPosted" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.hour": 1
                }
            },
            {
                $project: {
                    _id: 0,
                    hour: "$_id.hour",
                    count: 1
                }
            }
        ]);

        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error while getting hourly order count for past 24 hours.');
    }
}


const getDailyOrderCountByWeekdays = async (restaurantId: number) => {
    try {
        const data = await Order.aggregate([
            {
                $match: {
                    restaurantId,
                }
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfWeek: "$orderPosted" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                  "_id.day": 1,
                }
            },
            {
                $project: {
                    _id: 0,
                    day: "$_id.day",
                    count: 1
                }
            }
            
        ]);

        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error while getting weekday order count.');
    }
}


const getDailyOrderCountByMonth = async (restaurantId: number) => {
    try {
        const data = await Order.aggregate([
            {
                $match: {
                    restaurantId,
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$orderPosted" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                  "_id.month": 1,
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    count: 1
                }
            }
            
        ]);

        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error while getting monthly order count.');
    }
}

export {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    updateOrderWithCustomerId,
    getAllOrdersByRestaurantId,
    getHourlyOrderCountFor24Hours,
    getDailyOrderCountByWeekdays,
    getDailyOrderCountByMonth
}