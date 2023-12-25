"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextSequenceValue = void 0;
const mongoose_1 = require("mongoose");
//import { getNextSequenceValue } from './order.query';
const counter_order_model_1 = __importDefault(require("./counter.order.model"));
const OrderSchema = new mongoose_1.Schema({
    orderId: { type: Number },
    date: { type: Date, default: Date.now() },
    type: { type: String, required: true },
    customerId: { type: Number },
    serverId: { type: Number },
    totalValue: { type: Number, default: 0 },
    tableId: { type: Number, required: true },
    paymentStatus: { type: String },
    paymentMethod: { type: String },
    items: { type: [String] }
}, { timestamps: true });
const getNextSequenceValue = function (sequenceName) {
    return __awaiter(this, void 0, void 0, function* () {
        const sequenceDoc = yield counter_order_model_1.default.findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
        return sequenceDoc.sequence_value;
    });
};
exports.getNextSequenceValue = getNextSequenceValue;
// Middleware to auto-increment consumerId
OrderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        if (!doc.orderId) {
            doc.orderId = yield (0, exports.getNextSequenceValue)('orderIdCounter');
        }
        next();
    });
});
// OrderSchema.pre<IOrder>('save', async function (next) {
//     try {
//         const sequenceData = await SequenceModel.getNextAlphaNumSeq('orderId', {});
//         if (sequenceData) {
//             this.orderId = sequenceData.seqId || '1'; // Assuming seqId is a string representation of a number
//         } else {
//             // If the sequence data is not found, you may handle this case accordingly
//             console.error('Sequence data not found for orderId');
//         }
//         next();
//     } catch (error) {
//         console.error('Error generating orderId:', error);
//         //next(error);
//     }
// });
const Order = (0, mongoose_1.model)('order', OrderSchema);
exports.default = Order;
