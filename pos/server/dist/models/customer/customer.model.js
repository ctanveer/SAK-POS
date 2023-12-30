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
const CustomerSchema = new mongoose_1.Schema({
    customerId: { type: Number },
    type: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    orderHistory: [{
            date: { type: Date },
            orderId: { type: Number, required: true },
            ratings: {
                food: { type: String },
                service: { type: String }
            }
        }],
    vipStatus: { type: Boolean, default: false },
    joiningDate: { type: Date, default: Date.now(), immutable: true }
});
CustomerSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        if (!doc.customerId) {
            doc.customerId = yield (0, nextSequnece_1.getNextSequenceValue)('customerIdCounter');
            doc.type = 'inhouse';
        }
        next();
    });
});
const Customer = (0, mongoose_1.model)('customer', CustomerSchema);
exports.default = Customer;
