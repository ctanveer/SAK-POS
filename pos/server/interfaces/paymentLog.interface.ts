import {Types} from "mongoose";

export interface IPaymentLog {
    orderId: Types.ObjectId;
    totalBill: number;
    paid: boolean;
    pmtMode: 'cash' | 'card';
}