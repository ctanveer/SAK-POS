import { IItem } from "./item.model";
import { ICategories } from "./categories.model";

export interface IMenu{
    restaurantId: number;
    categories: ICategories[];
    items: IItem[];
}