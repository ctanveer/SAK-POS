import { Schema, Types } from "mongoose";

export interface ITableLog {
    tableId: Types.ObjectId;
    timeElapsed: number;
    orderId?: Types.ObjectId;
    waiterId?: number;
    customerId?:number;
    status: 'ongoing' | 'closed' | 'void';
}
