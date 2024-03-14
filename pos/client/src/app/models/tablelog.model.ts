export interface ITableLog {
    _id?: string;
    tableId: string;
    timeElapsed: number;
    orderId?: string;
    waiterId?: number;
    customerId?: number;
    status: string;
    createdAt: number;
    updatedAt: number;
}