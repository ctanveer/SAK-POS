import { IIngredient } from "./ingredient.model";

export interface INoOption {
    ingredientName: string;
    quantity: number;       //fixed number, cannot be changed
    ingredient: IIngredient;
}