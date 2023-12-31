import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routers/auth.router';
import tableRouter from './routers/table.router';
import orderRouter from './routers/order.router'
import customerRouter from './routers/customer.router';
import tableLogRouter from './routers/tableLog.router';
import { config } from './config';

const app = express();

app.use(cors({ origin: config.CORS_ORIGIN.split(","), exposedHeaders: ['Authorization']}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/table', tableRouter);
app.use('/order', orderRouter);
app.use('/customer', customerRouter);
app.use('/table-log', tableLogRouter);

(async function bootstrap() {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to DB');
    app.listen(config.PORT, () => {
      console.log("Server is listening", config.PORT);
    });
})();
