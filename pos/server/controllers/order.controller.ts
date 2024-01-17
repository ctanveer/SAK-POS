import {Request, Response} from 'express';
import {
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    updateOrderWithCustomerId,
    getAllOrdersByRestaurantId
} from '../models/order/order.query';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { postOrderToKDS } from '../services/skeleton.service';
import { getDataFromStatus } from '../utils/status.helper';
import { getLatestOngoingOrderForTable, updateTableLogById } from '../models/tableLog/tableLog.query';
import mongoose from 'mongoose';

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

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const { orderId } = req.params;
    const { status } = req.body;

    if (
      !orderId ||
      (status !== "pending" &&
      status !== "preparing" &&
      status !== "ready" &&
      status !== "complete")
    ) return res.status(400).send({ message: "Invalid fields." });

    const order = await getOrderById(orderId);

    if (!order) return res.status(404).json({ error: "Order not found." });
    else if (order.restaurantId !== user.employeeInformation.restaurantId)
      return res.status(403).json({ error: "Order not from your restaurant." });
    else {
      const newData = getDataFromStatus(status);
      const updatedOrder = await updateOrderById(orderId, newData);

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
      if (updatedOrder) await postOrderToKDS(updatedOrder, token);
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

export const getOrderByIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const order = await getOrderById(id);
      res.json(order);
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
        const orderObject = { ...req.body };
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


export const sendOrderToKDS = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const authHeaders = req.headers["authorization"];
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });
    if (!authHeaders) return res.status(401).send({ message: 'Unauthorized.' });

    const order = req.body.order;
    order.restaurantId = user.employeeInformation.restaurantId;

    const orderCheck = await getOrderById(order._id);
    if (orderCheck && orderCheck.items && orderCheck.orderPosted) order.orderUpdatedAt = new Date();
    else order.orderPosted = new Date();

    console.log('Order:', order);
    await updateOrderById(order.orderId, order);
    await postOrderToKDS(order, authHeaders);
    res.send({ message: "Success"});

  } catch (error: any) {
    res.status(500);
    res.json({ message: error.message });
  }
}