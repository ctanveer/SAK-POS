import mongoose from 'mongoose';
import { Request, Response } from "express";
import {
    getAllPaymentLogs,
    getPaymentLogsByOrderId,
    createPaymentLog,
    updatePaymentLogById
} from '../models/paymentLog/paymentLog.query'

export const getAllPaymentLogsController = async (req: Request, res: Response) => {
    try {
        const pmtlogs = await getAllPaymentLogs();
        res.json(pmtlogs)
    } catch (error: any) {
        res.status(500);
        res.json({ error: error.message });
    }
};

export const getPaymentLogsByOrderIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pmtlogs = await getPaymentLogsByOrderId(id);
      res.json(pmtlogs);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const createPaymentLogController = async (req: Request, res: Response) => {
    try {
      const pmtLogObject = {...req.body };
      const pmtlog = await createPaymentLog(pmtLogObject);
      res.status(201);
      res.json(pmtlog);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
}


export const updatePaymentLogByIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pmtLogObject = { ...req.body };
      const pmtlog = await updatePaymentLogById(id, pmtLogObject);
      res.json(pmtlog);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};