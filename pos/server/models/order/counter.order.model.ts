import mongoose, { Schema } from 'mongoose';
const counterOrderSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
});
const CounterOrderModel = mongoose.model('Counter', counterOrderSchema);
export default CounterOrderModel;