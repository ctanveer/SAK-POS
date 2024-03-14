import { Response } from 'express';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { IOrder } from '../interfaces/order.interface';
import { sendMailToCustomer } from '../services/email.service';

export const sendMailController = async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user;
      const token = req.token;
      if (!user || !token) return res.status(401).send({ message: 'Unauthorized.' });

      const {email, fullOrder, totalBill}:{email: string, fullOrder: IOrder, totalBill: number} = req.body
      const info = await sendMailToCustomer(email, fullOrder, totalBill);
      res.json(info);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message});
    }
};
