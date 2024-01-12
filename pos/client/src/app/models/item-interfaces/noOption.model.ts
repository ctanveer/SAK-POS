import { IIngredientInterface } from "./ingredient.model";

export interface INoOptionInterface {
    ingredientName: string;
    quantity: number;       //fixed number, cannot be changed
    ingredient: IIngredientInterface;
}