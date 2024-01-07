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
exports.getTableByIdWithAllOrders = exports.deleteTableById = exports.updateTableById = exports.createTable = exports.getTableById = exports.getAllTables = void 0;
const table_model_1 = __importDefault(require("./table.model"));
const getAllTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const tables = yield table_model_1.default.find();
    return tables;
});
exports.getAllTables = getAllTables;
const getTableById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield table_model_1.default.findById(id);
    return table;
});
exports.getTableById = getTableById;
const createTable = (tableObject) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield table_model_1.default.create(Object.assign({}, tableObject));
    return table;
});
exports.createTable = createTable;
const updateTableById = (tableId, tableObject) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield table_model_1.default.findByIdAndUpdate({ _id: tableId }, Object.assign({}, tableObject), { new: true });
    return table;
});
exports.updateTableById = updateTableById;
const deleteTableById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const table = await Table.findOneAndDelete ({tableId: id});
    const table = yield table_model_1.default.findByIdAndDelete(id);
    return table;
});
exports.deleteTableById = deleteTableById;
/*
// set table as occupied
const setTableAsOccupiedByTableId = async (tableId: number, tableObject: ITable) => {
  const newOrder = await Order.create({tableId: tableId, serverId: tableObject.serverId})
  
  const table = await Table.findOneAndUpdate({tableId: tableId},
    {
      $set: {isOccupied : true, currentOrderId: newOrder.orderId, serverId: tableObject.serverId, capacity: tableObject.capacity, timeElapsed: Date.now(), bill: 0}
    },
    {new: true}
    );

    return table;
}



//set table as unoccupied
const closeAndUnoccupyTable = async (tableId: number) => {
  const table = await Table.findOneAndUpdate({tableId: tableId},
    {
      $set: {isOccupied : false, timeElapsed: null, capacity: null, currentOrderId: null, serverId: null, customerId: null, bill: 0}
    },
    {new: true}
    );

    return table;
}
*/
const getTableByIdWithAllOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
