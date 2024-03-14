import { Request, Response } from "express";
import {
    getAllCustomers,
    getCustomerById,
    createCustomer
} from '../models/customer/customer.query'


export const getAllCustomersController = async (req: Request, res: Response) => {
    try {
        const customers = await getAllCustomers();
        res.json(customers)
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const getCustomerByIdController = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const customer = await getCustomerById(id);
      res.json(customer);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};

export const createCustomerController = async (req: Request, res: Response) => {
    try {
      const customerObject = {...req.body };
      const customer = await createCustomer(customerObject);
      res.status(201);
      res.json(customer);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};