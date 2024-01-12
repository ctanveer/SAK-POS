import { IItemDetailPosInput } from "../itemDetail.model";

export interface IItem{
    restaurantId: number;
    categoryId: number;
    item: IItemDetailPosInput;
}