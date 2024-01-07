"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    type: { type: String, required: true, default: 'inhouse' },
    customerId: { type: Number },
    waiterId: { type: Number },
    bill: { type: Number, default: 0 },
    unit: { type: String, default: 'USD' },
    status: { type: String, required: true, default: 'ongoing', enum: ['ongoing', 'closed', 'void'] },
    timeSpent: { type: Number, default: 0 },
    items: { type: [String] }
}, { timestamps: true });
const Order = (0, mongoose_1.model)('order', OrderSchema);
exports.default = Order;
