import { IIngredientInterface } from "./ingredient.model";
import { IAddOptionInterface } from "./addOption.model";
import { INoOptionInterface } from "./noOption.model";

export interface IItemDetailPosInputInterface {
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
    ingredients: IIngredientInterface[];
    itemPackingType: string;  
    options: { add: IAddOptionInterface[]; no: INoOptionInterface[] };
}

export interface ItemDetailPosOutputInterface extends IItemDetailPosInputInterface{
    itemQuantity: number;   //Field added when sending from POS to Skeleton
    optionalNotes: String;  ////Field added when sending from POS to Skeleton
}