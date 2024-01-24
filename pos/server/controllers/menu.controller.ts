import {Request, Response} from 'express';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { getMenuFromMenuBuilder } from '../services/skeleton.service';
import { getCategoriesFromMenuBuilder } from '../services/skeleton.service'

export const getMenuItems = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const token = req.token;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });
        const restaurantId = user.employeeInformation.restaurantId;

        const menu = await getMenuFromMenuBuilder(token, restaurantId);
        // const menu = await getMenuFromMenuBuilder();
        res.send(menu);
    } catch (error: any) {
        res.status(500);
        res.json({message: error.message})
    }
};


export const getCategories = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const token = req.token;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });
        const restaurantId = user.employeeInformation.restaurantId;

        const categories = await getCategoriesFromMenuBuilder(token, restaurantId);
        res.send(categories);
    } catch (error: any) {
        res.status(500);
        res.json({message: error.message})
    }
}