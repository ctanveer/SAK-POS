"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TableSchema = new mongoose_1.Schema({
    num: { type: Number, required: true },
    capacity: { type: Number, required: true },
    timeElapsed: { type: Number, required: true, default: 0 },
    status: { type: Boolean, required: true, default: false },
    bill: { type: Number },
    serverId: { type: Number },
});
const Table = (0, mongoose_1.model)('table', TableSchema);
exports.default = Table;
