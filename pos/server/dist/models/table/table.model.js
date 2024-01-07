"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TableSchema = new mongoose_1.Schema({
    restaurantId: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    seats: { type: Number, required: true },
    position: {
        x: Number,
        y: Number,
        rotation: Number
    },
    status: { type: String, required: true, default: 'open', enum: ['open', 'occupied', 'reserved', 'closed'] },
});
const Table = (0, mongoose_1.model)('table', TableSchema);
exports.default = Table;
