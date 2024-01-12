import { IIngredientInterface } from "./ingredient.model";

export interface IAddOptionInterface {
    ingredientName: string;
    quantity: number;       //fixed number, cannot be changed
    ingredient: IIngredientInterface;
}