import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import tableRouter from './routers/table.router';
import orderRouter from './routers/order.router'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/table', tableRouter);
app.use('/order', orderRouter);


(async function bootstrap() {
    //await mongoose.connect(process.env.MONGO_URI as string);
    await mongoose.connect('mongodb://localhost:27017/pos-db');
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is listening at http://127.0.0.1:${PORT}`);
    });
})();
