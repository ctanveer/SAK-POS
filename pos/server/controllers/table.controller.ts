import {Request, Response } from 'express';
import {
    getAllTables,
    getTableById,
    createTable,
    updateTableById,
    deleteTableById,
    getAllTablesForRestaurant,
    getAllTablesByTableCapacity,
    getAllTablesForRestaurantByTableCapacity
} from '../models/table/table.query'
import { AuthRequest } from '../interfaces/authRequest.interface';

export const getTablesOfAllRestaurantsController = async (req: Request,  res: Response) => {
  try {
    const tables = await getAllTables();
    res.json(tables);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }
}

export const getAllTablesController = async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).send({ message: 'Unauthorized.' });
      
      const tables = await getAllTablesForRestaurant(user.employeeInformation.restaurantId);
      res.json(tables)
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const getAllTablesByTableCapacityController = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });
    const tableCapacity = parseInt(req.params.tableCapacity);

    const tables = await getAllTablesByTableCapacity(tableCapacity);
    res.json(tables)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }
};

export const getAllTablesForRestaurantByTableCapacityController = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });
    const restaurantId = parseInt(req.params.restaurantId);
    const tableCapacity = parseInt(req.params.tableCapacity);

    const tables = await getAllTablesForRestaurantByTableCapacity(restaurantId, tableCapacity);
    res.json(tables)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  } 
};

export const getTableByIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const table = await getTableById(id);
      res.json(table);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const createTableController = async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).send({ message: 'Unauthorized.' });

      const tableObject = {...req.body, restaurantId: user.employeeInformation.restaurantId };
      const table = await createTable(tableObject);
      res.status(201);
      res.json(table);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const updateTableByIdController = async (req: Request, res: Response) => {
    try {
      const tableId = req.params.id;
      const tableObject = { ...req.body };
      const table = await updateTableById(tableId, tableObject);
      res.json(table);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const deleteTableByIdController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const response = await deleteTableById(id);
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const occcupyTableByIdController = async (req: Request, res: Response) => {
  try {
    const tableId = req.params.id;
    const tableObject = {status: "occupied"};
    const response = await updateTableById(tableId, tableObject);
    res.json(response)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }
}

export const unoccupyTableByIdController = async (req: Request, res: Response) => {
  try {
    const tableId = req.params.id;
    const tableObject = {status: "open"};
    const response = await updateTableById(tableId, tableObject);
    res.json(response)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message});
  }
}



//const { id } = req.user as { id: string }; // This is the user id / creator id
