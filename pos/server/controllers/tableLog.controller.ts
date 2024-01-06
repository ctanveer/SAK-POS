import mongoose from 'mongoose';
import { Request, Response } from "express";
import {
    getAllTableLogs,
    getTableLogsByTableId,
    createTableLog,
    updateTableLogById,
    deleteTableLogById
} from '../models/tableLog/tableLog.query'
import { updateTableById } from "../models/table/table.query";
import { createOrder } from "../models/order/order.query";

export const getAllTableLogsController = async (req: Request, res: Response) => {
    try {
        const tables = await getAllTableLogs();
        res.json(tables)
    } catch (error: any) {
        res.status(500);
        res.json({ error: error.message });
    }
};

export const getTableLogsByTableIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const table = await getTableLogsByTableId(id);
      res.json(table);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const createTableLogController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const waiterObject = {...req.body};
        //update table status using tableId property in params
        let table = await updateTableById(id, {status: 'occupied'});
        
        if (table) {
            //create new order with reqObject contaning waiterId
            const order = await createOrder(waiterObject);
            const tablelog = await createTableLog({tableId: table._id, orderId: order._id, waiterId: order.waiterId})
            res.status(201);
            res.json(tablelog);
        }
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};