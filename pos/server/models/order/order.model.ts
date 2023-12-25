import {Schema, model} from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'

const OrderSchema = new Schema<IOrder>({
    orderId: {type: Number, required: true},
    date: {type: Date, default: Date.now()},
    type: {type: String, required: true},
    customerId: {type: Number},
    serverId: {type: Number},
    totalValue: {type: Number, default: 0},
    tableId: {type: Number, required: true},
    paymentStatus: {type: String},
    paymentMethod: {type: String},
    items: {type: [String]}
}, {timestamps: true})

const Order = model<IOrder>('order', OrderSchema);

export default Order;