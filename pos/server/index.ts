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
import menuRouter from './routers/menu.router';
import { config } from './config';
import paymentLogRouter from './routers/paymentLog.router';
import hrRouter from './routers/hr.router';
import reservationRouter from './routers/reservation.router';
import bodyParser from 'body-parser';
import emailRouter from './routers/email.router';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: config.CORS_ORIGIN.split(","),
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use((req: Request, res: Response, next: NextFunction) => {
    // Attach io to app locals
    res.locals.io = io;
    next();
});


// Use body-parser middleware
app.use(bodyParser.json());

app.use(cors({ origin: config.CORS_ORIGIN.split(","), exposedHeaders: ['Authorization']}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/table', tableRouter);
app.use('/order', orderRouter);
app.use('/customer', customerRouter);
app.use('/table-log', tableLogRouter);
app.use('/menu', menuRouter);
app.use('/payment-log', paymentLogRouter);
app.use('/hr', hrRouter);
app.use('/reservation', reservationRouter);
app.use('/mailer', emailRouter);

(async function bootstrap() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to DB');
    server.listen(config.PORT, () => {
      console.log("Server is listening", config.PORT);
    });
  } catch (error) {
    console.log(error);
  }
})();

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("join", (data: { restaurantId: number }) => {
    socket.join(data.restaurantId.toString());
  });
});
