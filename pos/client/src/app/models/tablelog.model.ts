import { IOrder } from "./order.model";
import { ITable } from "./table.model";

export interface ITableLog {
    _id?: string;
    tableId: string;
    timeElapsed: number;
    orderId?: string;
    waiterId?: number;
    customerId?: number;
    status: string; //'ongoing', 'closed', 'void'
    createdAt: number;
    updatedAt: number;
}