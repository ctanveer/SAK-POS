import { Schema } from 'mongoose';

export interface IOrder {
    type: string;
    customerId?: number;
    waiterId?: number;
    bill: number;
    unit: string;
    status: string;
    timeSpent: number;
    items: string[];
}