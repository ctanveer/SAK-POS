import { OptionInterface } from "./option.interface";
import { IngredientInterface } from "./ingredient.interface";
import { IPacking } from "../packing.interface";
import { RecipeInterface } from "./recipe.interface";


// export interface ItemInterface{
//     restaurantId: number;
//     categoryId: number;
//     item: ItemDetailPosInputInterface;
// }

export interface ItemInterface {
    _id: string;
  restaurantId: number;
  categoryId: string;
  mealTimeId: number;
  item: {
    _id: string; //
    itemId: number; //
    itemName: string; //
    itemImage: string; //
    itemDescription: string; //
    itemQuantity: number; //
    itemPreparationTime: number; //
    itemPackingType: IPacking; //
    // itemPackingDimension?: string[];  //PackingInterface
    itemLastingTime?: number; //needed for marketplace
    itemPortionSize: string;
    ingredients: { rawIngredients: IngredientInterface[]; recipes: RecipeInterface[] }; //IRecipe[]
    options: { add: OptionInterface[]; no: OptionInterface[] };
    chosenOptions?: { add: OptionInterface[]; no: OptionInterface[] };
    optionalNotes?: string;
    discount?: number;
    isDisabled?: boolean;
    itemPrice: number;
    itemCalories: number;
    timeOfDay: string[];
    itemProfileTastyTags: string[];
    typeOfFoods: string[];
    servingTemperature: number;
    itemDietaryRestrictions: string[];
  };
}