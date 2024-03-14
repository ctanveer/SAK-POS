import {Request, Response} from 'express';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { getAllReservationsForToday } from '../services/skeleton.service';
import { getAllReservations } from '../services/skeleton.service';
import { postStatusUpdateToReservations } from '../services/skeleton.service';


export const getAllReservationsForTodayController = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const token = req.token;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });
        
        const restaurantId = req.params.id;
        const date = (new Date().toISOString().split('T')[0]) + 'T00:00:00.000Z'; //"2024-01-25T00:00:00.000Z"

        const reservationList = await getAllReservationsForToday(token, restaurantId, date);
        res.send(reservationList);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: (error as Error).message});
    }
}

export const getAllReservationsController = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const token = req.token;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });
        
        const restaurantId = req.params.id;

        const reservationList = await getAllReservations(token, restaurantId);
        res.send(reservationList);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: (error as Error).message});
    }
}

export const updateReservationStatusContrller = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.user;
        const token = req.token;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });
        
        const reservation = req.body;

        const restaurantId = parseInt(req.params.id);

        const updatedReservation = postStatusUpdateToReservations(token, restaurantId, reservation);
        res.send(updatedReservation);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: (error as Error).message});
    }
}