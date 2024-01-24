import mongoose from 'mongoose';
import {Request, Response} from 'express';
import { getPopulatedTableLogByOrderId } from '../models/tableLog/tableLog.query';


export const postWaiterDataToHRController = async (req: Request, res: Response) => {
    try {
        console.log('At BE - HR Controller');
        const {waiterData} = req.body

        //const tablelog = await getPopulatedTableLogByOrderId(id);
        //if (!tablelog) return res.status(404).json({ error: "Table Log not found." });
        
        
        console.log('Waiter Data is: ', waiterData);
        res.send(waiterData);

    } catch (error: any) {
        console.log(error);
        res.status(500);
        res.json({ error: error.message }); 
    }
}

export const getPopulatedTableLogByOrderIdController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const tablelog = await getPopulatedTableLogByOrderId(id);
        if (!tablelog) return res.status(404).json({ error: "Table Log not found." });
        
        res.send(tablelog);

    } catch (error: any) {
        console.log(error);
        res.status(500);
        res.json({ error: error.message }); 
    }
}