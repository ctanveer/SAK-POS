import { IngredientInterface } from "./ingredient.interface";

export interface AddOptionInterface {
    ingredientName: string;
    quantity: number;       //fixed number, cannot be changed
    ingredient: IngredientInterface;
}