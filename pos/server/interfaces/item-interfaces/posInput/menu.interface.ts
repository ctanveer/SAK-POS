import { ItemInterface } from "./item.interface";
import { CategoriesInterface } from "../categories.interface";

export interface MenuInterface{
    restaurantId: number;
    categories: CategoriesInterface[];
    items: ItemInterface[];
}