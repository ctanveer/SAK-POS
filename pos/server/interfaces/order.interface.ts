import { OrderItemInterface } from "./item.interface";

export interface IOrder {
    orderId: number;
    date: Date;
    type: string;
    customerId?:number;
    serverId?: number;
    totalValue: number;
    orderStatus: string;
    tableId: number;
    paymentStatus: string;
    paymentMethod: string;
    items: string[];
}