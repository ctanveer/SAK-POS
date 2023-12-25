"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TableSchema = new mongoose_1.Schema({
    tableId: { type: Number, required: true },
    capacity: { type: Number, required: true },
    timeElapsed: { type: Number, required: true, default: 0 },
    isOccupied: { type: Boolean, required: true, default: false },
    bill: { type: Number },
    orderId: { type: Number },
    serverId: { type: Number },
    customerId: { type: Number }
});
const Table = (0, mongoose_1.model)('table', TableSchema);
exports.default = Table;
