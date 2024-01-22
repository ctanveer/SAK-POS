import {Types} from "mongoose";

export interface IPaymentLog {
    orderId: Types.ObjectId;
    totalBill: string;
    paid: boolean;
    pmtMode: string;  //cash or card
}