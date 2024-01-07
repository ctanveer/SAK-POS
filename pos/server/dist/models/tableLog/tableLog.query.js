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
exports.deleteTableLogById = exports.updateTableLogById = exports.createTableLog = exports.getTableLogsByTableId = exports.getAllTableLogs = void 0;
const tableLog_model_1 = __importDefault(require("./tableLog.model"));
const getAllTableLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const tablelogs = yield tableLog_model_1.default.find().populate('orderId').exec();
    return tablelogs;
});
exports.getAllTableLogs = getAllTableLogs;
const getTableLogsByTableId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tablelogs = yield tableLog_model_1.default.find({ tableId: id }).populate('orderId').exec();
    return tablelogs;
});
exports.getTableLogsByTableId = getTableLogsByTableId;
const createTableLog = (tablelogObject) => __awaiter(void 0, void 0, void 0, function* () {
    const tablelog = yield tableLog_model_1.default.create(Object.assign({}, tablelogObject));
    return tablelog;
});
exports.createTableLog = createTableLog;
const updateTableLogById = (id, tablelogObject) => __awaiter(void 0, void 0, void 0, function* () {
    const tablelog = yield tableLog_model_1.default.findByIdAndUpdate({ _id: id }, Object.assign({}, tablelogObject), { new: true });
    return tablelog;
});
exports.updateTableLogById = updateTableLogById;
const deleteTableLogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const table = await Table.findOneAndDelete ({tableId: id});
    const tablelog = yield tableLog_model_1.default.findByIdAndDelete(id);
    return tablelog;
});
exports.deleteTableLogById = deleteTableLogById;
