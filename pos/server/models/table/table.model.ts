import { Schema, model } from 'mongoose';
import { ITable } from '../../interfaces/table.interface';

const TableSchema = new Schema<ITable>({
    tableId: {type: Number, required: true},
    capacity: {type: Number, required: true},
    timeElapsed: {type: Number, required: true, default: 0},
    isOccupied: {type: Boolean, required: true, default: false},
    bill: {type: Number},
    orderId: {type: Number},
    serverId: {type: Number},
    customerId: {type: Number}
});

const Table = model<ITable>('table', TableSchema);

export default Table;
