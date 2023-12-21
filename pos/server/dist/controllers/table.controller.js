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
exports.deleteTableByIdController = exports.updateTableByIdController = exports.createTableController = exports.getTableByIdController = exports.getAllTablesController = void 0;
const table_query_1 = require("../models/table/table.query");
const getAllTablesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tables = yield (0, table_query_1.getAllTables)();
        res.json(tables);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getAllTablesController = getAllTablesController;
const getTableByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const table = yield (0, table_query_1.getTableById)(id);
        res.json(table);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getTableByIdController = getTableByIdController;
const createTableController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const { id } = req.user as { id: string }; // This is the user id / creator id
        const tableObject = Object.assign({}, req.body);
        const table = yield (0, table_query_1.createTable)(tableObject);
        res.status(201);
        res.json(table);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.createTableController = createTableController;
const updateTableByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableId = req.params.id; // This is the category id
        const tableObject = Object.assign({}, req.body);
        const table = yield (0, table_query_1.updateTableById)(tableId, tableObject);
        res.json(table);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.updateTableByIdController = updateTableByIdController;
const deleteTableByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield (0, table_query_1.deleteTableById)(id);
        res.json(response);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.deleteTableByIdController = deleteTableByIdController;
