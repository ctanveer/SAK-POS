import { ItemInterface } from "./item.interface";
import { CategoriesInterface } from "../categories.interface";

export interface OrderListInterface {
    restaurantId : number,
    orderId: number,
    categories: CategoriesInterface[], //need to discuss about this
    orderTime: number,
    orderType: string, //inhouse or marketplace
    vipCustomer: boolean,
    tableId: number,
    items: ItemInterface[],
}