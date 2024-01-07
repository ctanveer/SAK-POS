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
exports.createTableLogController = exports.getTableLogsByTableIdController = exports.getAllTableLogsController = void 0;
const tableLog_query_1 = require("../models/tableLog/tableLog.query");
const table_query_1 = require("../models/table/table.query");
const order_query_1 = require("../models/order/order.query");
const getAllTableLogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tables = yield (0, tableLog_query_1.getAllTableLogs)();
        res.json(tables);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getAllTableLogsController = getAllTableLogsController;
const getTableLogsByTableIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const table = yield (0, tableLog_query_1.getTableLogsByTableId)(id);
        res.json(table);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getTableLogsByTableIdController = getTableLogsByTableIdController;
const createTableLogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const waiterObject = Object.assign({}, req.body);
        //update table status using tableId property in params
        let table = yield (0, table_query_1.updateTableById)(id, { status: 'occupied' });
        if (table) {
            //create new order with reqObject contaning waiterId
            const order = yield (0, order_query_1.createOrder)(waiterObject);
            const tablelog = yield (0, tableLog_query_1.createTableLog)({ tableId: table._id, orderId: order._id, waiterId: order.waiterId });
            res.status(201);
            res.json(tablelog);
        }
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.createTableLogController = createTableLogController;
