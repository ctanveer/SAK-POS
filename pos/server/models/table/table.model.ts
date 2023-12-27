import { Schema, model, Types } from 'mongoose';
import { ITable } from '../../interfaces/table.interface';
import { getNextSequenceValue } from '../../utils/nextSequnece';

const TableSchema = new Schema<ITable>({
    tableId: {type: Number},
    capacity: {type: Number, required: true},
    timeElapsed: {type: Number, required: true, default: 0},
    isOccupied: {type: Boolean, required: true, default: false},
    bill: {type: Number},
    currentOrderId: {type: Number},
    //order: { type: Types.ObjectId, ref: 'order' },
    //order: { type: Number, ref: 'order' },
    //order: { type: Number },
    serverId: {type: Number},
    customerId: {type: Number}
}, 
{
    toObject: {virtuals: true},
    toJSON: { virtuals: true }
});

TableSchema.virtual('orderList', {
    ref: 'order',
    localField: 'tableId',
    foreignField: 'tableId'  
})

// Middleware to auto-increment tableId
TableSchema.pre('save', async function (next) {
    const doc = this;
    if (!doc.tableId) {
        doc.tableId = await getNextSequenceValue('tableIdCounter');
    }
    next();
});

const Table = model<ITable>('table', TableSchema);

export default Table;
