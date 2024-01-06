import { Schema, model, Types } from 'mongoose';
import { ITable } from '../../interfaces/table.interface';

const TableSchema = new Schema<ITable>({
    restaurantId: {type: Number, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    seats: {type: Number, required: true},
    position: {
        x: Number,
        y: Number,
        rotation : Number
    },
    status: {type: String, required: true, default: 'open', enum: ['open', 'occupied', 'reserved', 'closed']},
}
);

const Table = model<ITable>('table', TableSchema);

export default Table;
