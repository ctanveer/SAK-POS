import {Schema, model, Types} from 'mongoose'
import { IOrder } from '../../interfaces/order.interface'
import { ItemInterface } from '../../interfaces/item-interfaces/posOutput/item.interface';
import { IngredientInterface } from '../../interfaces/item-interfaces/ingredient.interface'
import { IUser } from '../../interfaces/user.interface';

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
              quantity: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              ingredient: ingredientSchema,
            },
          ],
          no: [
            {
              quantity: { type: Number, required: true },
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
              quantity: { type: Number, required: true },
              ingredientName: { type: String, required: true },
              ingredient: ingredientSchema,
            },
          ],
          no: [
            {
              quantity: { type: Number, required: true },
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
  status: {type: String, required: true, default: 'pending', enum: ['pending', 'preparing', 'ready', 'served', 'cancel']},
  vipCustomer: { type: Boolean, required: true, default: false },
  items: {type: [itemSchema]},
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