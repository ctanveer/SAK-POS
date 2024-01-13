import { IngredientInterface } from "./ingredient.interface";
import { AddOptionInterface } from "./addOption.interface";
import { NoOptionInterface } from "./noOption.interface";

export interface ItemDetailPosInputInterface {
    itemId: number;
    itemName: string;
    discount: number;   //extra added by Skeleton
    isDisabled: boolean;    //extra added by Skeleton
    itemPrice: number;
    itemCalories: number;
    itemImage: string;      //web link string, grab from cloud
    timeOfDay: string[];    //mealTimeId not needed anymore
    itemProfileTastyTags: string[];
    itemPortionSize: string;
    itemPreparationTime: number;
    itemLastingTime: number;
    typeOfFoods: string[]; //options 'delivery only', 'eat only', 'pickup only', 'all'
    servingTemperature: number;
    itemDietaryRestrictions: string[];
    ingredients: IngredientInterface[];
    itemPackingType: string;  
    options: { add: AddOptionInterface[]; no: NoOptionInterface[] };
}

export interface ItemDetailPosOutputInterface extends ItemDetailPosInputInterface{
    itemQuantity: number;   //Field added when sending from POS to Skeleton
    optionalNotes: String;  ////Field added when sending from POS to Skeleton
}