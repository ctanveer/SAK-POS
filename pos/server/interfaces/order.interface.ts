import { Schema } from 'mongoose';
import { ItemInterface } from './item-interfaces/posOutput/item.interface';

export interface IOrder {
    type: string;
    customerId?: number;
    waiterId?: number;
    bill: number;
    unit: string;
    status: string;
    timeSpent: number;
    // items: string[];
    items?: ItemInterface[];
}