import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  emailUrl = environment.API_URL + "/mailer";

  sendEmail(email: string | null, fullOrder: IOrder, totalBill: number | null) {
    return this.http.post(`${this.emailUrl}/send`, {email, fullOrder, totalBill}, this.httpOptions)
  }
}
