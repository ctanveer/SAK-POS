import { IItem } from "./item-interfaces/posOutput/item.model";

export interface IOrder {
    _id?: string;
    type: string;
    waiterId?:number;
    customerId?: number;
    bill:number;
    unit: string;
    status: string;
    timeSpent: number;
    item: IItem[];
    createdAt: string;
    updatedAt: string;
}