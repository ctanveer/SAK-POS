import { IOrder } from "./order.model";
import { ITable } from "./table.model";

export interface ITLogPopulated {
    _id?: string;
    tableId: ITable;
    timeElapsed: number;
    orderId?: IOrder;
    waiterId?: number;
    customerId?: number;
    status: string;
    createdAt: number;
    updatedAt: number;
}