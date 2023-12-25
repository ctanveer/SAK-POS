import {Request, Response} from 'express';
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById
} from '../models/order/order.query';

export const getAllOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await getAllOrders();
        res.json(orders)
    } catch (error: any) {
        res.status(500);
        res.json({ error: error.message });
    }
};

export const getOrderByIdController = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const order = await getOrderById(id);
      res.json(order);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const createOrderController = async (req: Request, res: Response) => {
    try {
      const orderObject = {...req.body };
      const order = await createOrder(orderObject);
      res.status(201);
      res.json(order);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const updateOrderByIdController = async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id);
        const orderObject = { ...req.body };
        const order = await updateOrderById(orderId, orderObject);
        res.json(order);
    } catch (error: any) {
        res.status(500);
        res.json({error: error.message});
    }
}

export const deleteOrderByIdController = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const response = await deleteOrderById(id);
      res.json(response);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};