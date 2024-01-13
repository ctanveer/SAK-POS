import { ItemDetailPosOutputInterface } from "../itemDetail.interface";

export interface ItemInterface{
    restaurantId: number;
    categoryId: number;
    item: ItemDetailPosOutputInterface;
}