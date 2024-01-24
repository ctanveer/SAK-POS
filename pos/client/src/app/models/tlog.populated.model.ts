import { IOrder } from "./order.model";
import { IPacking } from "./packing.model";
import { ITable } from "./table.model";

export interface ITLogPopulated {
    _id?: string;
    // tableId: string;
    tableId: ITable;
    timeElapsed: number;
    orderId?: IOrder;
    waiterId?: number;
    customerId?: number;
    status: string; //'ongoing', 'closed', 'void'
    createdAt: number;
    updatedAt: number;
}