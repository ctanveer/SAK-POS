export interface IIngredientInterface {
    id: number;
    restaurantId: number;
    ingredientName: string;
    unitOfStock: string;
    quantity: number;
    costPerUnit: number;
    caloriesPerUnit: number;    //spelling change to calories
}