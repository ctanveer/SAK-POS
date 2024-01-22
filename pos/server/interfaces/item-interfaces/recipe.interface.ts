import { IngredientInterface } from "./ingredient.interface";

export interface RecipeInterface{
    restaurantId?: number,
    categoryId: number,
    recipeId: number,
    recipeName: string,
    recipeItemPortionSize: number,
    recipeItemPreparationTime: number,
    recipeItemCost: number,
    recipeItemCalories: number,
    recipeItemDescription: string,
    ingredients: IngredientInterface[]
}