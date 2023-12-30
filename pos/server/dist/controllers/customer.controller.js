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
exports.createCustomerController = exports.getCustomerByIdController = exports.getAllCustomersController = void 0;
const customer_query_1 = require("../models/customer/customer.query");
const getAllCustomersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield (0, customer_query_1.getAllCustomers)();
        res.json(customers);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getAllCustomersController = getAllCustomersController;
const getCustomerByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const customer = yield (0, customer_query_1.getCustomerById)(id);
        res.json(customer);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.getCustomerByIdController = getCustomerByIdController;
const createCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerObject = Object.assign({}, req.body);
        const customer = yield (0, customer_query_1.createCustomer)(customerObject);
        res.status(201);
        res.json(customer);
    }
    catch (error) {
        res.status(500);
        res.json({ error: error.message });
    }
});
exports.createCustomerController = createCustomerController;
