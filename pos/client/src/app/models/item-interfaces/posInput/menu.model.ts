import { IItemInterface } from "./item.model";
import { ICategoriesInterface } from "../categories.model";

export interface IMenuInterface{
    restaurantId: number;
    categories: ICategoriesInterface[];
    items: IItemInterface[];
}