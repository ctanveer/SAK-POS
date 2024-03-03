import { Request, Response } from "express";
import { config } from '../config';

const stripe = require("stripe")(config.STRIPE_KEY);

export const createPaymentController = async (req: Request, res: Response) => {
    try {
        const {items} = req.body;
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1400,
            currency: "gbp",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        res.status(500);
        res.json({ error: error.message });
    }
};