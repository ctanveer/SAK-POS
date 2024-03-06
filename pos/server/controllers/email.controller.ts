import { Request, Response } from 'express';
import { AuthRequest } from '../interfaces/authRequest.interface';
import nodemailer from 'nodemailer';
import { IOrder } from '../interfaces/order.interface';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ItemInterface } from '../interfaces/item-interfaces/item.interface';
import * as fs from 'fs';
import { config } from "../config";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
});

const sendMailController = async (req: AuthRequest, res: Response) => {
    try {
      const {email, fullOrder, totalBill}:{email: string, fullOrder: IOrder, totalBill: number} = req.body
      const info = await sendMail(email, fullOrder, totalBill);
      res.json(info);
    } catch (error: any) {
      console.log(error)
      res.status(500);
      res.json({ error: error.message });
    }
};

function  createDocumentDefinition(order: IOrder, items: ItemInterface[], totalBill: number) {
    const currentDate = new Date().toLocaleDateString();
    return {
      content: [
        { text: 'Restaurant Bill', style: 'header' },
        { text: `Restaurant ID: ${order.restaurantId}`, style: 'subheader' },
        { text: `Restaurant Name: The One And Only Bento Restaurant`, style: 'subheader' },
        { text: `Order Id: ${order._id}`, style: 'subheader' },
        '\n',
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Item', 'Quantity', 'Price'],
              ...items.map(item => [item.item.itemName, item.item.itemQuantity, item.item.itemPrice])
            ]
          }
        },
        '\n',
        { text: `Total: $${totalBill}`, style: 'total' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        total: {
          fontSize: 14,
          bold: true,
          alignment: 'right',
          margin: [0, 0, 0, 10]
        }
      }
    }
}


function sendMail(toEmail: string, order: IOrder, totalBill: number) {
    let documentDefinition: any | null = null
    if (order.items) documentDefinition = createDocumentDefinition(order, order.items, totalBill);
    
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBuffer((buffer) => {
        const filePath = 'bill/bill.pdf';
        fs.writeFile(filePath, buffer, (err) => {
          if (err) {
            console.error('Error saving PDF:', err);
          }
        });
    });


    return new Promise((resolve, reject) => {
        const mailOptions = {
            // from: 'bento.mailer.service@gmail.com',
            from: config.EMAIL_USER,
            to: toEmail,
            subject: `Restaurant Order Bill # ${order._id}`,
            text: `Dear Customer, Please find the attached Invoice below.\n\n
              Please post your review at the following link:\n 
              https://bento-reviews-crabypatty.koyeb.app/orderDetails/pos/${order._id}`,
            attachments: [
                {
                  filename: `Order_${order._id}_invoice.pdf`,
                  path: 'bill/bill.pdf',
                },
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

export { sendMailController };
