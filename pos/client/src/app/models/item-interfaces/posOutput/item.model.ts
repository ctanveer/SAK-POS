import { ItemDetailPosOutputInterface } from "../itemDetail.model";

export interface IItemInterface{
    restaurantId: number;
    categoryId: number;
    item: ItemDetailPosOutputInterface;
}