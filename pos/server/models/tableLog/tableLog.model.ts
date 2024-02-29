import { Schema, model, Types } from 'mongoose';
import { ITableLog } from '../../interfaces/tableLog.interface';

const TableLogSchema = new Schema<ITableLog>({
  tableId: {
    type: Schema.Types.ObjectId,
    ref: 'table',
    required: true,
  },
  timeElapsed: {type: Number, required: true, default: 0},
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'order',
  },
  waiterId: {type: Number, default: null},
  customerId: {type: Number, default: null},
  status: {type: String, required: true, default: 'ongoing', enum: ['ongoing', 'closed', 'cancel']},
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.createdAt = ret.createdAt && ret.createdAt.getTime();
      ret.updatedAt = ret.updatedAt && ret.updatedAt.getTime();
      return ret;
    },
  }
}
)

const TableLog = model<ITableLog>('table-log', TableLogSchema);

export default TableLog;