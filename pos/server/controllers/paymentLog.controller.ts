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
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const getPaymentLogsByOrderIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pmtlogs = await getPaymentLogsByOrderId(id);
      res.json(pmtlogs);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const createPaymentLogController = async (req: Request, res: Response) => {
    try {
      const pmtLogObject = {...req.body };
      const pmtlog = await createPaymentLog(pmtLogObject);
      res.status(201);
      res.json(pmtlog);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
}


export const updatePaymentLogByIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const pmtLogObject = { ...req.body };
      const pmtlog = await updatePaymentLogById(id, pmtLogObject);
      res.json(pmtlog);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};