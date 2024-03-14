import {Request, Response} from 'express';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { getMenuDiscountFromSkeleton } from '../services/skeleton.service';

export const getDiscountController = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const token = req.token;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });

        const discount = await getMenuDiscountFromSkeleton(token);
        res.send(discount);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: (error as Error).message});
      }
};
