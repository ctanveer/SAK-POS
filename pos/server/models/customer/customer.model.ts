import { Schema, model, Types } from 'mongoose';
import { ICustomer } from '../../interfaces/customer.interface';
import { getNextSequenceValue } from '../../utils/nextSequnece';

const CustomerSchema = new Schema<ICustomer>({
    customerId: {type: Number},
    type: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number},
    orderHistory: [{
        date: {type: Date},
        orderId: {type: Number, required: true},
        ratings:
            {
                food: {type: String},
                service: {type: String}
            }
        }],
    vipStatus: {type: Boolean, default: false},
    joiningDate: {type: Date, default: Date.now(), immutable: true}
})

CustomerSchema.pre('save', async function (next) {
    const doc = this;
    if (!doc.customerId) {
        doc.customerId = await getNextSequenceValue('customerIdCounter');
        doc.type = 'inhouse';
    }
    next();
});


const Customer = model<ICustomer>('customer', CustomerSchema);
export default Customer;