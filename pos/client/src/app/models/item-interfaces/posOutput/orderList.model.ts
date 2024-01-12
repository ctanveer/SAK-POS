import { IItemInterface } from "./item.model";
import { ICategoriesInterface } from "../categories.model";

export interface IOrderListInterface {
    restaurantId : number,
    orderId: number,
    categories: ICategoriesInterface[], //need to discuss about this
    orderTime: number,
    orderType: string, //inhouse or marketplace
    vipCustomer: boolean,
    tableId: number,
    items: IItemInterface[],
}