export interface ITableLog {
    _id?: string;
    // tableId: string;
    tableId: object;
    timeElapsed: number;
    orderId?: string;
    waiterId?: number;
    customerId?: number;
    createdAt: number;
    updatedAt: number;
}