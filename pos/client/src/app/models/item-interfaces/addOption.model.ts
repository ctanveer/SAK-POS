import { IIngredient } from "./ingredient.model";

export interface IAddOption {
    ingredientName: string;
    quantity: number;       //fixed number, cannot be changed
    ingredient: IIngredient;
}