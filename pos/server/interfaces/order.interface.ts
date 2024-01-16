import { ItemInterface } from './item-interfaces/posOutput/item.interface';
import { IUser } from './user.interface';

export interface IOrder {
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