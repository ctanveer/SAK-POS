import { Schema } from "mongoose";

interface IOrderHistory {
    date: Date;
    orderId: number;
}

export interface ICustomer {
    customerId: number;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    orderHistory: {
        date: Date;
        orderId: number;
        ratings: {
            food: string;
            service: string;
        }
    }[];
    vipStatus: boolean;
    joiningDate: Date;
}