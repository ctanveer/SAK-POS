export interface ITableLog {
    _id?: string;
    // tableId: string;
    tableId: string;
    timeElapsed: number;
    orderId?: string;
    waiterId?: number;
    customerId?: number;
    createdAt: number;
    updatedAt: number;
}