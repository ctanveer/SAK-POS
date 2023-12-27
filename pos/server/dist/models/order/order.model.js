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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const nextSequnece_1 = require("../../utils/nextSequnece");
const OrderSchema = new mongoose_1.Schema({
    orderId: { type: Number },
    date: { type: Date, default: Date.now() },
    type: { type: String, required: true },
    customerId: { type: Number },
    serverId: { type: Number },
    totalValue: { type: Number, default: 0 },
    tableId: { type: Number, required: true },
    //tableId: { type: Types.ObjectId, ref: 'Table', required: true },
    //table: {type: mongoose.Types.ObjectId, ref: 'table', required: true},
    paymentStatus: { type: String },
    paymentMethod: { type: String },
    items: { type: [String] }
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
OrderSchema.virtual('tableNumber', {
    ref: 'table',
    localField: 'orderId',
    foreignField: 'currentOrderId',
    justOne: true
});
// Middleware to auto-increment orderId
OrderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        if (!doc.orderId) {
            doc.orderId = yield (0, nextSequnece_1.getNextSequenceValue)('orderIdCounter');
        }
        next();
    });
});
const Order = (0, mongoose_1.model)('order', OrderSchema);
exports.default = Order;
