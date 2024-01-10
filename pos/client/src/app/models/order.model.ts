export interface IOrder {
    _id?: string;
    type: string;
    waiterId?:number;
    customerId?: number;
    bill:number;
    unit: string;
    status: string;
    timeSpent: number;
    item: string[];
    createdAt: string;
    updatedAt: string;
}