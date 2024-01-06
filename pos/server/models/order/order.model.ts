import {Schema, model, Types} from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'

const OrderSchema = new Schema<IOrder>({
    type: {type: String, required: true, default: 'inhouse'},
    customerId: {type: Number},
    waiterId: {type: Number},
    bill: {type: Number, default: 0},
    unit: {type: String, default: 'USD'},
    status: {type: String, required: true, default: 'ongoing', enum: ['ongoing', 'closed', 'void']},
    timeSpent: {type: Number, default: 0},
    items: {type: [String]}
},{timestamps: true});


const Order = model<IOrder>('order', OrderSchema);

export default Order;