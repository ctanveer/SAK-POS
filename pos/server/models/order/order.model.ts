import {Schema, model, Types} from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'
import { ItemInterface } from '../../interfaces/item-interfaces/posOutput/item.interface';
import { IngredientInterface } from '../../interfaces/item-interfaces/ingredient.interface'

const ingredientSchema = new Schema<IngredientInterface>({
    id: { type: Number, required: true },
    restaurantId: { type: Number, required: true },
    ingredientName: { type: String, required: true },
    unitOfStock: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPerUnit: { type: Number, required: true },
    caloriesPerUnit: { type: Number, required: true },  //name change
});

const itemSchema = new Schema<ItemInterface>({
    restaurantId: { type: Number, required: true },
    categoryId: { type: Number, required: true },
    item: {
      itemId: { type: Number, required: true },
      itemName: { type: String, required: true },
      itemImage: { type: String, required: true },
      itemQuantity: { type: Number, required: true },
      itemPreparationTime: { type: Number, required: true },
      itemPackingType: { type: String, required: true },
      //itemPackingDimension: packingSchema,
      //ItemServingTemperature: { type: String, required: true }, 
      itemLastingTime: { type: Number, required: true }, //needed for marketplace
      itemPortionSize: { type: String, required: true }, 
      ingredients: [ingredientSchema],
      options: {
        type: {
          add: [
            {
              ingredientId: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              ingredient: ingredientSchema,
            },
          ],
          no: [
            {
              ingredientId: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              ingredient: ingredientSchema,
            },
          ],
        },
        required: true
      },
      chosenOptions: {
        type: {
          add: [
            {
              ingredientId: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              ingredient: ingredientSchema,
            },
          ],
          no: [
            {
              ingredientId: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              ingredient: ingredientSchema,
            },
          ],
        },
      },
      optionalNotes: { type: String }, 
      discount: { type: Number, required: true },
      isDisabled: { type: Boolean, required: true },
      itemPrice: { type: Number, required: true },
      itemCalories: { type: Number, required: true },
      timeOfDay: { type: [String], required: true },
      itemProfileTastyTags: { type: [String], required: true },
      typeOfFoods: { type: [String], required: true },
      servingTemperature: { type: Number, required: true },
      itemDietaryRestrictions: { type: [String], required: true },
    },
});

const OrderSchema = new Schema<IOrder>({
    type: {type: String, required: true, default: 'in-house'},
    customerId: {type: Number},
    waiterId: {type: Number},
    bill: {type: Number, default: 0},
    unit: {type: String, default: 'USD'},
    status: {type: String, required: true, default: 'ongoing', enum: ['ongoing', 'closed', 'void']},
    timeSpent: {type: Number, default: 0},
    items: {type: [itemSchema]}
},{timestamps: true});


const Order = model<IOrder>('order', OrderSchema);

export default Order;