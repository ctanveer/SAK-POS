export interface ITable {
    tableId: number;
    capacity: number;
    timeElapsed: number;
    isOccupied: Boolean;
    bill?: number;
    orderId?:number;
    serverId?: number;
    customerId?:number;
}