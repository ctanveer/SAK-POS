import { OrderItemInterface} from "./item.interface";
import { Schema, Types } from 'mongoose';

export interface IOrder {
    orderId: number;
    date: Date;
    type: string;
    customerId?:number;
    serverId?: number;
    totalValue: number;
    orderStatus: string;
    tableId: number;
    //table?: Types.ObjectId;
    paymentStatus: string;
    paymentMethod: string;
    items: string[];
}