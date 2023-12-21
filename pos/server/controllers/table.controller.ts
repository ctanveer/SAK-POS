import {Request, Response } from 'express';
import {
    getAllTables,
    getTableById,
    createTable,
    updateTableById,
    deleteTableById
} from '../models/table/table.query'

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
      const id = req.params.id;
      const table = await getTableById(id);
      res.json(table);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

export const createTableController = async (req: Request, res: Response) => {
    try {
      //const { id } = req.user as { id: string }; // This is the user id / creator id
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
      const tableId = req.params.id; // This is the category id
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
      const id = req.params.id;
      const response = await deleteTableById(id);
      res.json(response);
    } catch (error: any) {
      res.status(500);
      res.json({ error: error.message });
    }
};

