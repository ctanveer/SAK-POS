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
router.delete('/:id', table_controller_1.deleteTableByIdController);
router.put('/table-occupy/:id', table_controller_1.occcupyTableByIdController);
router.put('/table-open/:id', table_controller_1.unoccupyTableByIdController);
exports.default = router;
