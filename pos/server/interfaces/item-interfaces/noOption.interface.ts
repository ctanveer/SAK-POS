import { IngredientInterface } from "./ingredient.interface";

export interface NoOptionInterface {
    ingredientName: string;
    quantity: number;       //fixed number, cannot be changed
    ingredient: IngredientInterface;
}