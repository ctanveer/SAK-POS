import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from "http";
import { Server } from "socket.io";
import authRouter from './routers/auth.router';
import tableRouter from './routers/table.router';
import orderRouter from './routers/order.router'
import customerRouter from './routers/customer.router';
import tableLogRouter from './routers/tableLog.router';
import { config } from './config';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use((req: Request, res: Response, next: NextFunction) => {
    // Attach io to app locals
    res.locals.io = io;
    next();
});


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
    server.listen(config.PORT, () => {
      console.log("Server is listening", config.PORT);
    });
})();

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("join", (data: { restaurantId: number }) => {
    socket.join(data.restaurantId.toString());
  });
});
