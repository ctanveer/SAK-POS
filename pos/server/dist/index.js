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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const table_router_1 = __importDefault(require("./routers/table.router"));
const order_router_1 = __importDefault(require("./routers/order.router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/table', table_router_1.default);
app.use('/order', order_router_1.default);
(function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        //await mongoose.connect(process.env.MONGO_URI as string);
        yield mongoose_1.default.connect('mongodb://localhost:27017/pos-db');
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server is listening at http://127.0.0.1:${PORT}`);
        });
    });
})();
