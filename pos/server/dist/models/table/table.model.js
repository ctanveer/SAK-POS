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
const TableSchema = new mongoose_1.Schema({
    tableId: { type: Number },
    name: { type: String, required: true },
    type: { type: String },
    seats: { type: Number, required: true },
    position: {
        x: Number,
        y: Number,
        rotation: Number
    },
    date: { type: Number, required: true, default: Date.now() },
    timeElapsed: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, default: 'open' },
    currentOrderId: { type: Number, default: null },
    waiterId: { type: Number, default: null },
    customerId: { type: Number, default: null }
});
/*
{
    toObject: {virtuals: true},
    toJSON: { virtuals: true }
}

TableSchema.virtual('orderList', {
    ref: 'order',
    localField: 'tableId',
    foreignField: 'tableId'
})
*/
// Middleware to auto-increment tableId
TableSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = this;
        if (!doc.tableId) {
            doc.tableId = yield (0, nextSequnece_1.getNextSequenceValue)('tableIdCounter');
        }
        next();
    });
});
const Table = (0, mongoose_1.model)('table', TableSchema);
exports.default = Table;
