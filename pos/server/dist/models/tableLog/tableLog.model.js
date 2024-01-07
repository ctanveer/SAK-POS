"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TableLogSchema = new mongoose_1.Schema({
    tableId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'table',
        required: true,
    },
    timeElapsed: { type: Number, required: true, default: 0 },
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'order',
    },
    waiterId: { type: Number, default: null },
    customerId: { type: Number, default: null }
}, { timestamps: true });
const TableLog = (0, mongoose_1.model)('table-log', TableLogSchema);
exports.default = TableLog;
