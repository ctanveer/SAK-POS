import {Request, Response} from 'express';
import { getPopulatedTableLogByOrderId } from '../models/tableLog/tableLog.query';
import { postWaiterdataToHR } from '../services/skeleton.service';
import { AuthRequest } from '../interfaces/authRequest.interface';

export const postWaiterDataToHRController = async (req:AuthRequest, res: Response) => {
    try {
        console.log('At BE - HR Controller');
        const user = req.user;
        const token = req.token;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });

        const waiterData = req.body;
        
        const receivedData = await postWaiterdataToHR(waiterData, token);
        res.send(receivedData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: (error as Error).message});
    }
}

export const getPopulatedTableLogByOrderIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const tablelog = await getPopulatedTableLogByOrderId(id);
        if (!tablelog) return res.status(404).json({ error: "Table Log not found." });
        
        res.send(tablelog);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: (error as Error).message});
      }
}