import {Request, Response } from 'express';
import {
    getAllTables,
    getTableByIdWithAllOrders,
    createTable,
    updateTableById,
    deleteTableById,
    setTableAsOccupiedByTableId
} from '../models/table/table.query'
import { parse } from 'dotenv';

export const getAllTablesController = async (req: Request, res: Response) => {
    try {
        const tables = await getAllTables();
        res.json(tables)
    } catch (error: any) {
        res.status(500);
        res.json({ error: error.message });
    }
};

export const getTableByIdController = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const table = await getTableByIdWithAllOrders(id);
      res.json(table);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const createTableController = async (req: Request, res: Response) => {
    try {
      const tableObject = {...req.body };
      const table = await createTable(tableObject);
      res.status(201);
      res.json(table);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const updateTableByIdController = async (req: Request, res: Response) => {
    try {
      const tableId = parseInt(req.params.id); 
      const tableObject = { ...req.body };
      const table = await updateTableById(tableId, tableObject);
      res.json(table);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const deleteTableByIdController = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const response = await deleteTableById(id);
      res.json(response);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const setTableAsOccupiedController = async (req: Request, res: Response) => {
  try {
    const tableId = parseInt(req.params.id);
    const tableObject = {...req.body}
    const response = await setTableAsOccupiedByTableId(tableId, tableObject);
    res.json(response)
  } catch (error: any) {
    res.status(500);
    res.json({ error: error.message });
  }
}



//const { id } = req.user as { id: string }; // This is the user id / creator id
