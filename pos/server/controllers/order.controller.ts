import mongoose from 'mongoose';
import {Request, Response} from 'express';
import * as fs from 'fs';
import {
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    updateOrderWithCustomerId,
    getAllOrdersByRestaurantId,
    getHourlyOrderCountFor24Hours,
    getDailyOrderCountByWeekdays,
    getDailyOrderCountByMonth
} from '../models/order/order.query';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { postOrderToKDS } from '../services/skeleton.service';
import { postStatusUpdateToKDS } from '../services/skeleton.service';
import { getDataFromStatus } from '../utils/status.helper';
import { getLatestOngoingOrderForTable, getTableLogForOrderId, updateTableLogById } from '../models/tableLog/tableLog.query';
import { getTableById } from '../models/table/table.query';

export const getAllRestaurantOrdersController = async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).send({ message: 'Unauthorized.' });

      const orders = await getAllOrdersByRestaurantId(user.employeeInformation.restaurantId);
      res.status(200).send({ data: orders });
    } catch (error: any) {
        res.status(500);
        res.json({ message: error.message });
    }
};

export const getOrderByIdController = async (req: AuthRequest, res: Response) => {
  try {
    //const user = req.user;
    // const token = req.token;
    // if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });
    
    const id = req.params.id;
    const order = await getOrderById(id);
    res.json(order);
  } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { status } = req.body;
    console.log('Status is: ', {status});

    if (
      !orderId ||
      (status !== "pending" &&
      status !== "preparing" &&
      status !== "ready" &&
      status !== "served" &&
      status !== "complete")
    ) return res.status(400).send({ message: "Invalid fields." });

    const order = await getOrderById(orderId);

    if (!order) return res.status(404).json({ error: "Order not found." });
    else if (order.restaurantId !== user.employeeInformation.restaurantId)
      return res.status(403).json({ error: "Order not from your restaurant." });
    else {
      console.log('Successful update! 👌');

      const newData = getDataFromStatus(status);
      const updatedOrder = await updateOrderById(orderId, newData);

      console.log('Updated Order is: ', updatedOrder);
      if (updatedOrder) {
        const tableLog = await getTableLogForOrderId(updatedOrder._id);
        if (tableLog) {
          console.log('Table Log is: ', tableLog);
          const table = await getTableById(tableLog.tableId);
          if (table) {
            console.log('Table is: ', table);
            const io = res.locals.io;
            io.to(updatedOrder.restaurantId.toString()).emit('order-status-change', { order: updatedOrder, table });
          }
        }
      }

      if (updatedOrder && status === 'served') {
        console.log('Updating status to served')
        await postStatusUpdateToKDS(updatedOrder, token);
      }

      res.status(200).json(updatedOrder);
    }

  } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
  }
};


export const updateOrderItemStatus = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { items, status } = req.body;

    if (
      !orderId || !items ||
      (status !== "pending" &&
      status !== "preparing" &&
      status !== "ready" &&
      status !== "served" &&
      status !== "complete")
    ) return res.status(400).send({ message: "Invalid fields." });

    const order = await getOrderById(orderId);

    if (!order) return res.status(404).json({ error: "Order not found." });
    else if (order.restaurantId !== user.employeeInformation.restaurantId)
      return res.status(403).json({ error: "Order not from your restaurant." });
    else {
      console.log('Successful update! 👌');
      const updatedOrder = await updateOrderById(orderId, { items });

      console.log('Updated Order is: ', updatedOrder);
      // if (updatedOrder) {
      //   const tableLog = await getTableLogForOrderId(updatedOrder._id);
      //   if (tableLog) {
      //     console.log('Table Log is: ', tableLog);
      //     const table = await getTableById(tableLog.tableId);
      //     if (table) {
      //       console.log('Table is: ', table);
      //       const io = res.locals.io;
      //       io.to(updatedOrder.restaurantId.toString()).emit('order-status-change', { order: updatedOrder, table });
      //     }
      //   }
      // }

      // if (updatedOrder && status === 'served') {
      //   console.log('Updating status to served')
      //   await postStatusUpdateToKDS(updatedOrder, token);
      // }

      res.status(200).json(updatedOrder);
    }

  } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
  }
};

export const updateOrderItems = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { items, bill } = req.body;

    const order = await getOrderById(orderId);

    if (!order) return res.status(404).json({ error: "Order not found." });
    else if (order.restaurantId !== user.employeeInformation.restaurantId)
      return res.status(403).json({ error: "Order not from your restaurant." });
    else {
      const newData = {
        items,
        bill,
        ...(order.orderPosted ? { orderUpdatedAt: new Date() } : { orderPosted: new Date() })
      }

      const updatedOrder = await updateOrderById(orderId, newData);
      
      if (updatedOrder) {
        // fs.writeFileSync('data-1.json', JSON.stringify(updatedOrder))
        await postOrderToKDS(updatedOrder, token);
      }
        
      res.send(updatedOrder);
    }
    
  } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
  }
};


export const generateOrderForTable = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const id = req.params.id;
    const latestOngoingOrder = await getLatestOngoingOrderForTable(id);

    if (latestOngoingOrder && latestOngoingOrder.orderId) {
      const order = await getOrderById(latestOngoingOrder.orderId);
      res.send(order);
    } else if (latestOngoingOrder) {
      const data = {
        restaurantId: user.employeeInformation.restaurantId,
        type: 'in-house',
        waiterId: user.employeeInformation.id,
        bill: 0,
        unit: 'USD',
        status: 'pending',
        items: [],
        createdAt: new Date(),
        vipCustomer: false
      }

      const newOrder = await createOrder(data);
      await updateTableLogById(latestOngoingOrder._id, { orderId: new mongoose.Types.ObjectId(newOrder._id) });
      res.status(201).send(newOrder);
    } else {
      res.status(400).send({ message: 'Table is currently not occupied.' });
    }

  } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
  }
}

export const updateOrderChef = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { chef } = req.body;

    const order = await getOrderById(orderId);

    if (!order) return res.status(404).json({ error: "Order not found." });
    else if (order.restaurantId !== user.employeeInformation.restaurantId)
      return res.status(403).json({ error: "Order not from your restaurant." });
    else {
      const newData = { chef }

      const updatedOrder = await updateOrderById(orderId, newData);
      if (updatedOrder) await postOrderToKDS(updatedOrder, token);
      res.send(updatedOrder);
    }
    
  } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
  }
};

export const createOrderController = async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).send({ message: 'Unauthorized.' });

      const orderObject = {...req.body };
      orderObject.restaurantId = user.employeeInformation.restaurantId;
      const order = await createOrder(orderObject);
      res.status(201);
      res.json(order);
    } catch (error: any) {
      res.status(500);
      res.json({ message: error.message });
    }
};

export const updateOrderByIdController = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const orderObject = { ...req.body, orderUpdatedAt: Date.now() };
        const order = await updateOrderById(orderId, orderObject);
        res.json(order);
    } catch (error: any) {
        res.status(500);
        res.json({message: error.message});
    }
}

export const updateOrderWithCustomerIdController = async (req: Request, res: Response) => {
  try {
    const {orderId, customerId} = req.params;
    const order = await updateOrderById(orderId, {customerId: parseInt(customerId)});
    res.json(order)
  } catch (error: any) {
    res.status(500);
    res.json({message: error.message});
  }
}

export const deleteOrderByIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const response = await deleteOrderById(id);
      res.json(response);
    } catch (error: any) {
      res.status(500);
      res.json({ message: error.message });
    }
};


export const getHourlyCountOfOrders = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const data = await getHourlyOrderCountFor24Hours(user.employeeInformation.restaurantId);
    res.send({ data });
  } catch (error : any) {
    res.status(500);
    res.json({ message: error.message });
  }
}

export const getWeekdayCountOfOrders = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const data = await getDailyOrderCountByWeekdays(user.employeeInformation.restaurantId);
    res.send({ data });
  } catch (error : any) {
    res.status(500);
    res.json({ message: error.message });
  }
}

export const getMonthlyCountOfOrders = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const data = await getDailyOrderCountByMonth(user.employeeInformation.restaurantId);
    res.send({ data });
  } catch (error : any) {
    res.status(500);
    res.json({ message: error.message });
  }
}