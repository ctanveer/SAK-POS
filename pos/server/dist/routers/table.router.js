"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const table_controller_1 = require("../controllers/table.controller");
const router = express_1.default.Router();
router.get('/', table_controller_1.getAllTablesController);
router.get('/:id', table_controller_1.getTableByIdController);
router.post('/', table_controller_1.createTableController);
router.put('/:id', table_controller_1.updateTableByIdController);
router.put('/set-table/:id', table_controller_1.setTableAsOccupiedController);
router.put('/close-table/:id', table_controller_1.closeAndUnoccupyTableController);
router.delete('/:id', table_controller_1.deleteTableByIdController);
exports.default = router;
