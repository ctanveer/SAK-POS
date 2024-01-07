"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tableLog_controller_1 = require("../controllers/tableLog.controller");
const router = express_1.default.Router();
router.get('/', tableLog_controller_1.getAllTableLogsController);
router.get('/:id', tableLog_controller_1.getTableLogsByTableIdController);
router.post('/:id', tableLog_controller_1.createTableLogController);
exports.default = router;
