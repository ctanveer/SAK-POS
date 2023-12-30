import {Schema, model, Types} from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'
import { getNextSequenceValue } from '../../utils/nextSequnece';

const OrderSchema = new Schema<IOrder>({
    orderId: {type: Number},
    //date: {type: Date, default: Date.now()},
    type: {type: String},
    customerId: {type: Number},
    serverId: {type: Number},
    totalValue: {type: Number, default: 0},
    tableId: {type: Number, required: true},
    //tableId: { type: Types.ObjectId, ref: 'Table', required: true },
    //table: {type: mongoose.Types.ObjectId, ref: 'table', required: true},
    paymentStatus: {type: String},
    paymentMethod: {type: String},
    items: {type: [String]}
}, 
{
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});


OrderSchema.virtual('tableNumber', {
    ref: 'table',
    localField: 'orderId',
    foreignField: 'currentOrderId',
    justOne: true
})

// Middleware to auto-increment orderId
OrderSchema.pre('save', async function (next) {
    const doc = this;
    if (!doc.orderId) {
        doc.orderId = await getNextSequenceValue('orderIdCounter');
        doc.type = 'inhouse'
    }
    next();
});

const Order = model<IOrder>('order', OrderSchema);

export default Order;