import { Schema, Types } from "mongoose";
import { ITable } from "./table.interface";
import { IOrder } from "./order.interface";

export interface ITableLog {
    tableId: Types.ObjectId;
    timeElapsed: number;
    orderId?: Types.ObjectId;
    waiterId?: number;
    customerId?:number;
    status: 'ongoing' | 'closed' | 'void';
    createdAt?: Date;
    updatedAt?: Date;
}
