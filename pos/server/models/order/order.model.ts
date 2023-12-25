import {Schema, model} from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'
//import { getNextSequenceValue } from './order.query';
import CounterOrderModel from './counter.order.model';

const OrderSchema = new Schema<IOrder>({
    orderId: {type: Number},
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


export const getNextSequenceValue = async function (sequenceName: any) {
    const sequenceDoc = await CounterOrderModel.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    return sequenceDoc.sequence_value;
};

// Middleware to auto-increment orderId
OrderSchema.pre('save', async function (next) {
    const doc = this;
    if (!doc.orderId) {
        doc.orderId = await getNextSequenceValue('orderIdCounter');
    }
    next();
});


// OrderSchema.pre<IOrder>('save', async function (next) {
//     try {
//         const sequenceData = await SequenceModel.getNextAlphaNumSeq('orderId', {});
        
//         if (sequenceData) {
//             this.orderId = sequenceData.seqId || '1'; // Assuming seqId is a string representation of a number
//         } else {
//             // If the sequence data is not found, you may handle this case accordingly
//             console.error('Sequence data not found for orderId');
//         }

//         next();
//     } catch (error) {
//         console.error('Error generating orderId:', error);
//         //next(error);
//     }
// });

const Order = model<IOrder>('order', OrderSchema);

export default Order;