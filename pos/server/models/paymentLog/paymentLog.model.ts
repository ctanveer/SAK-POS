import {Schema, model} from 'mongoose';
import { IPaymentLog } from '../../interfaces/paymentLog.interface';


const PaymentLogSchema = new Schema<IPaymentLog>({
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'order',
      required: true,
    },
    totalBill: {type: String, default: null},
    paid: {type: Boolean, default: false},
    pmtMode: {type: String, enum: ['cash', 'card']},
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
})

const PaymentLog = model<IPaymentLog>('payment-log', PaymentLogSchema);
export default PaymentLog;