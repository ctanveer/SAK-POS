export interface CategoriesInterface {
    id: Number;
    name: String;
}
    
export interface POSIngredientInterface {
    id: Number;
    restaurantId: Number;
    ingredientName: String;
    unit: String;
    quantity: Number;
    costPerUnit: Number;
    caloriePerUnit: Number;
}

export interface PackingInterface {
  dimensionLength: Number;
  dimensionWidth: Number;
  dimensionHeight: Number;
}

export interface AddOptionInterface {
  ingredientId: Number;
  ingredientName: String;
  ingredient: POSIngredientInterface[];
}

export interface NoOptionInterface {
  ingredientId: Number;
  ingredientName: String;
  ingredient: POSIngredientInterface;
}

export interface ItemInterface {
  itemId: Number;
  itemName: String;
  itemImage: String;    //newly included
  categoryId: Number;
  itemQuantity: Number;   //newly added
  itemPreparationTime: Number;    //time in caps
  itemPackingType: String;    //newly added
  itemPackingDimension: PackingInterface;  //spelling mistake
  ingredients: POSIngredientInterface[];
  options: { add: AddOptionInterface[]; no: NoOptionInterface[] };
  optionalNotes: String;
}

export interface OrderItemInterface {
  restaurantId: Number;
  orderId: Number;
  categories: CategoriesInterface[];
  orderTime: Number;
  orderType: String; //inhouse or marketplace
  vipCustomer: Boolean;
  tableId: Number;
  items: ItemInterface[];
}