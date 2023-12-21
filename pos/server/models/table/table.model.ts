import { Schema, model } from 'mongoose';

const TableSchema = new Schema({
    num: {type: Number, required: true},
    capacity: {type: Number, required: true},
    timeElapsed: {type: Number, required: true, default: 0},
    status: {type: Boolean, required: true, default: false},
    bill: {type: Number},
    serverId: {type: Number},
})

const Table = model('table', TableSchema);

export default Table;
