"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    orderId: { type: Number, required: true },
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
const Order = (0, mongoose_1.model)('order', OrderSchema);
exports.default = Order;
