import mongoose, { Schema } from 'mongoose';
const counterSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
});
const CounterModel = mongoose.model('Counter', counterSchema);
export default CounterModel;