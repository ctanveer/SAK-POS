import { IIngredient } from "../ingredient.model";
import { IOption } from "../option.model";
// import { IItemDetailPosOutput } from "../itemDetail.model";

// export interface IItem{
//     restaurantId: number;
//     categoryId: number;
//     item: IItemDetailPosOutput;
// }

export interface IItem {
    _id: string;
    restaurantId: number;
    categoryId: string;
    mealTimeId: number;
    item: {
      _id: string;
      itemId: number;
      itemName: string;
      itemImage: string;
      itemDescription: string;
      itemQuantity?: number;
      itemPreparationtime: number;
      itemPackingType: string[];
      itemPackingDimension?: string;    //PackingInterface
      itemLastingTime?: number; //needed for marketplace
      itemPortionsize: string;
      ingredients: { rawIngredients: IIngredient[]; recipes: string[] };    //IRecipe[]
      options: { add: IOption[]; no: IOption[] };
      chosenOptions?: { add: IOption[]; no: IOption[] };
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