import { IItem } from "./item-interfaces/item.model";
import { IUser } from './user.model';

export interface IOrder {
    _id: string;
    restaurantId: number;
    type: string;
    customerId?: number;
    waiterId?: number;
    bill: number;
    unit: string;
    status: string;
    vipCustomer: boolean;
    items?: IItem[];
    createdAt: Date;
    orderPosted?: Date;
    orderUpdatedAt?: Date;
    preparingTimestamp?: Date;
    readyTimestamp?: Date;
    servedTimestamp?: Date;
    chef?: IUser;
    deliveryTimestamp?: Date;
    cancelTimestamp?: Date;
}

export interface IOrderHistory extends IOrder {
    expand?: boolean;
}