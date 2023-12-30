"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const router = express_1.default.Router();
router.get('/', customer_controller_1.getAllCustomersController);
router.get('/:id', customer_controller_1.getCustomerByIdController);
router.post('/', customer_controller_1.createCustomerController);
exports.default = router;
