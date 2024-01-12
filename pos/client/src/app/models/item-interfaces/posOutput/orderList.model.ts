import { IItem } from "./item.model";
import { ICategories } from "../categories.model";

export interface IOrderListInterface {
    restaurantId : number,
    orderId: number,
    categories: ICategories[], //need to discuss about this
    orderTime: number,
    orderType: string, //inhouse or marketplace
    vipCustomer: boolean,
    tableId: number,
    items: IItem[],
}