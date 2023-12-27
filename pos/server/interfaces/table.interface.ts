import { Schema } from "mongoose";

export interface ITable {
    tableId: number;
    capacity: number;
    timeElapsed: number;
    isOccupied: Boolean;
    bill?: number;
    currentOrderId?: number;
    // order?: Schema.Types.ObjectId;
    // order?: Number;
    serverId?: number;
    customerId?:number;
}