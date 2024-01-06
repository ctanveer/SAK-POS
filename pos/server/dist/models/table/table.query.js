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
exports.closeAndUnoccupyTable = exports.setTableAsOccupiedByTableId = exports.deleteTableById = exports.updateTableById = exports.createTable = exports.getTableByIdWithAllOrders = exports.getTableById = exports.getAllTables = void 0;
const table_model_1 = __importDefault(require("./table.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const order_query_1 = require("../order/order.query");
const getAllTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const tables = yield table_model_1.default.find();
    return tables;
});
exports.getAllTables = getAllTables;
const getTableById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //const table = await Table.findById(id);
    const table = yield table_model_1.default.findOne({ tableId: id });
    return table;
});
exports.getTableById = getTableById;
const getTableByIdWithAllOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //const table = await Table.findById(id);
    //const table = await Table.findOne({tableId: id}).populate('order').exec();
    //const table = await Table.findOne({tableId: id}).populate('orderList').exec();
    const table = yield table_model_1.default.aggregate([
        {
            $match: {
                tableId: id
            },
        },
        {
            $lookup: {
                from: 'orders',
                localField: 'tableId',
                foreignField: 'tableId',
                as: 'listOfOrders'
            },
        },
    ]);
    return table;
});
exports.getTableByIdWithAllOrders = getTableByIdWithAllOrders;
const createTable = (tableObject) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield table_model_1.default.create(Object.assign({}, tableObject));
    return table;
});
exports.createTable = createTable;
const updateTableById = (tableId, tableObject) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield table_model_1.default.findOneAndUpdate({ tableId: tableId }, Object.assign({}, tableObject), { new: true });
    return table;
});
exports.updateTableById = updateTableById;
// set table as occupied
const setTableAsOccupiedByTableId = (tableId, tableObject) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = yield order_model_1.default.create({ tableId: tableId, waiterId: tableObject.waiterId, status: 'ongoing' });
    const table = yield table_model_1.default.findOneAndUpdate({ tableId: tableId }, Object.assign(Object.assign({}, tableObject), { status: 'occupied', currentOrderId: newOrder.orderId, date: newOrder.date, timeElapsed: 0 }), { new: true });
    return table;
});
exports.setTableAsOccupiedByTableId = setTableAsOccupiedByTableId;
//set table as unoccupied
const closeAndUnoccupyTable = (tableId) => __awaiter(void 0, void 0, void 0, function* () {
    let table = yield table_model_1.default.findOne({ tableId: tableId });
    if (table && table.currentOrderId) {
        const closedOrder = (0, order_query_1.updateOrderById)(table.currentOrderId, { status: 'closed', timeSpent: (Date.now() - table.date) });
    }
    table = yield table_model_1.default.findOneAndUpdate({ tableId: tableId }, {
        //$set: {isOccupied : false, timeElapsed: null, capacity: null, currentOrderId: null, serverId: null, customerId: null, bill: 0}
        status: 'open',
        currentOrderId: null,
        waiterId: null,
        customerId: null,
        date: null,
        timeElapsed: null
    }, { new: true });
    return table;
});
exports.closeAndUnoccupyTable = closeAndUnoccupyTable;
const deleteTableById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield table_model_1.default.findOneAndDelete({ tableId: id });
    return table;
});
exports.deleteTableById = deleteTableById;
