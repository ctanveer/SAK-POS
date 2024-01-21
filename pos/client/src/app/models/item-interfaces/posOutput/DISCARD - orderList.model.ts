import { IItem } from "../item.model";
import { ICategories } from "../categories.model";

export interface IOrderListInterface {
    restaurantId?: number,
    orderId: string,
    categories: ICategories[], //need to discuss about this
    orderTime: number,
    orderType: string, //inhouse or marketplace
    vipCustomer: boolean,
    tableId: string,
    items: IItem[],
}