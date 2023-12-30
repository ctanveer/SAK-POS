import Customer from "./customer.model";
import { ICustomer } from "../../interfaces/customer.interface";

const getAllCustomers = async () => {
    const customers = await Customer.find();
    return customers;
}

const getCustomerById = async (id: number) => {
    const customer = await Customer.aggregate([
        {
            $match: {
                customerId: id
            },
        }
    ])

    return customer;
}

const createCustomer = async (customerObject: ICustomer) => {
    const customer = await Customer.create({...customerObject});
    return customer;
}

export {
    getAllCustomers,
    getCustomerById,
    createCustomer
}