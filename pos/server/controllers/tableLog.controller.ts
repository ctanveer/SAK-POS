import { Request, Response } from "express";
import {
    getAllTableLogs,
    getTableLogsByTableId,
    createTableLog,
    updateTableLogById,
    getOngoingTableLogsByRestaurantId,
    getTableLogForOrderId
} from '../models/tableLog/tableLog.query'
import { AuthRequest } from '../interfaces/authRequest.interface';

export const getAllTableLogsController = async (req: Request, res: Response) => {
    try {
        const tables = await getAllTableLogs();
        res.json(tables)
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
  
};

export const getTableLogsByTableIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const tablelog = await getTableLogsByTableId(id);
      res.json(tablelog);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
  
};

export const getOngoingTableLogsByRestaurantIdController = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });

    const tablelogs = await getOngoingTableLogsByRestaurantId(user.employeeInformation.restaurantId);
    res.status(200).send({data: tablelogs});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }

}

export const updateTableLogByIdController = async (req: Request, res: Response) => {
  try {
    const tableLogId = req.params.id;
    const tableLogObject = { ...req.body };
    const tableLog = await updateTableLogById(tableLogId, tableLogObject);
    res.json(tableLog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }

};

export const createTableLogController = async (req: Request, res: Response) => {
  try {
    const tableObject = {...req.body };
    const tableLog = await createTableLog(tableObject);
    res.status(201);
    res.json(tableLog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }
};

export const getTableLogForOrderIdController = async (req: Request, res: Response) => {
  try {
    const orderId: string = req.params.id;
    const tableLog = await getTableLogForOrderId(orderId);
    res.status(200);
    res.json(tableLog);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }
}