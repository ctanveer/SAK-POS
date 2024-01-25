import {Schema, model, Types} from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'
import { ItemInterface } from '../../interfaces/item-interfaces/item.interface';
import { IngredientInterface } from '../../interfaces/item-interfaces/ingredient.interface'
import { IUser } from '../../interfaces/user.interface';
import { IPacking } from '../../interfaces/packing.interface';

const ingredientSchema = new Schema<IngredientInterface>({
    id: { type: Number, required: true },
    restaurantId: { type: Number, required: true },
    ingredientName: { type: String, required: true },
    unitOfStock: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPerUnit: { type: Number, required: true },
    caloriesPerUnit: { type: Number, required: true },  //name change
    _id: {type: String}
});

const recipeItemSchema = new Schema({
  restaurantId: { type: Number, required: true },
  categoryId: { type: Number, required: true },
  recipeId: { type: Number, required: true },
  recipeName: { type: String, required: true },
  recipeItemPortionSize: { type: Number, required: true },
  recipeItemPreparationTime: { type: Number, required: true },
  recipeItemCost: { type: Number, required: true },
  recipeItemCalories: { type: Number, required: true },
  recipeItemDescription: { type: String, required: true },
  ingredients: [ingredientSchema]
})

const packingSchema = new  Schema<IPacking>({
  id: {type: Number, required: true},
  boxName: {type: String, required: true},
  currentStockQuantity: {type: Number, required: true}, //
  unitOfPrice: {type: String, required: true}, //
  costPerUnit: {type: Number, required: true}, //
  reorderPoint: {type: Number, required: true}, //
  unitOfDimentions: {type: String, required: true}, //
  dimensions: {type: String, required: true}, //
  weightLimit: {type: Number, required: true}, //
  temperatureLimit: {type: Number, required: true}, //
  waterproof: {type: String, required: true}, //
  expectedStockForToday: {type: Number, required: true}, //
  expectedStockForTomorrow: {type: Number, required: true},
  restaurantId: {type: Number, required: true},
  createdAt: {type: Date},
  updatedAt: {type: Date}
})

const chefSchema = new Schema<IUser>({
  positionId: { type: Number },
  employeeInformation: {
    id: { type: Number, required: true },
    restaurantId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    experience: { type: [String], required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    skillTags: { type: [String], required: true },
    hourlyRate: { type: Number, required: true },
    efficiency: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    applicantId: Number
  }
})

const OrderSchema = new Schema<IOrder>({
  restaurantId: { type: Number, required: true },
  type: {type: String, enum: ['in-house', 'delivery'], required: true, default: 'in-house'},
  customerId: {type: Number},
  waiterId: {type: Number},
  bill: {type: Number, default: 0},
  unit: {type: String, default: 'USD'},
  status: {type: String, required: true, default: 'pending', enum: ['pending', 'preparing', 'ready', 'served', 'complete', 'cancel']},
  vipCustomer: { type: Boolean, required: true, default: false },
  items: {type: [{
    _id: {type: String, required: true},
    restaurantId: { type: Number, required: true },
    categoryId: { type: String, required: true },
    mealTimeId: {type: Number, required: true},
    item: {
      _id: {type: String, required: true},
      itemId: { type: Number, required: true },
      itemName: { type: String, required: true },
      itemImage: { type: String, required: true },
      itemDescription: { type: String, required: true },
      itemQuantity: { type: Number, required: true },
      itemPreparationTime: { type: Number, required: true },
      itemPackingType: { type: [packingSchema], required: true },
      itemPackingDimension: [String],
      itemLastingTime: { type: Number, required: true }, //needed for marketplace
      itemPortionSize: { type: String, required: true }, 
      ingredients: {
          rawIngredients: [ingredientSchema],
          recipes:[recipeItemSchema]
      },
      options: {
        type: {
          add: [
            {
              id: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              unitOfStock: { type: String, required: true },
              quantity: { type: Number, required: true },
              costPerUnit: { type: Number, required: true },
              caloriesPerUnit: {type: Number, required: true},
              price: { type: String, required: true },
              _id: {type: String, required: true} 
            },
          ],
          no: [
            {
              id: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              unitOfStock: { type: String, required: true },
              quantity: { type: Number, required: true },
              costPerUnit: { type: Number, required: true },
              caloriesPerUnit: {type: Number, required: true},
              price: { type: String, required: true },
              _id: {type: String, required: true} 
            },
          ],
        },
        required: true
      },
      chosenOptions: {
        type: {
          add: [
            {
              id: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              unitOfStock: { type: String, required: true },
              quantity: { type: Number, required: true },
              costPerUnit: { type: Number, required: true },
              caloriesPerUnit: {type: Number, required: true},
              price: { type: String, required: true },
              _id: {type: String, required: true}
            },
          ],
          no: [
            {
              id: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              unitOfStock: { type: String, required: true },
              quantity: { type: Number, required: true },
              costPerUnit: { type: Number, required: true },
              caloriesPerUnit: {type: Number, required: true},
              price: { type: String, required: true },
              _id: {type: String, required: true}
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
}]},
  orderPosted: { type: Date },
  orderUpdatedAt: { type: Date },
  preparingTimestamp: { type: Date },
  readyTimestamp: { type: Date },
  servedTimestamp: { type: Date },
  deliveryTimestamp: { type: Date },
  cancelTimestamp: { type: Date },
  chef: chefSchema
},{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.createdAt = ret.createdAt && ret.createdAt.getTime();
      ret.updatedAt = ret.updatedAt && ret.updatedAt.getTime();
      return ret;
    },
  }
});


const Order = model<IOrder>('order', OrderSchema);

export default Order;