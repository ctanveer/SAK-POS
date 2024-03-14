import Customer from "./customer.model";
import { ICustomer } from "../../interfaces/customer.interface";

const getAllCustomers = async () => {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting all customers from DB.');
    }
}

const getCustomerById = async (id: number) => {
    try {
        const customer = await Customer.aggregate([
            {
                $match: {
                    customerId: id
                },
            }
        ])
        return customer;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting customer by id from DB.');
    }
}

const createCustomer = async (customerObject: ICustomer) => {
    try {
        const customer = await Customer.create({...customerObject});
        return customer;
    } catch (error) {
        console.log(error);
        throw new Error('Error creating customer in DB.');
    }
}

export {
    getAllCustomers,
    getCustomerById,
    createCustomer
}