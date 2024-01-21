import { Types } from 'mongoose';
import { ItemInterface } from './item-interfaces/item.interface';
import { IUser } from './user.interface';

export interface IOrder {
    _id?: Types.ObjectId | string;
    restaurantId: number;
    type: string;
    customerId?: number;
    waiterId?: number;
    bill: number;
    unit: string;
    status: string;
    vipCustomer: boolean;
    items?: ItemInterface[];
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