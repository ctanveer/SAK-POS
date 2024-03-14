import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IPaymentLog } from '../models/paymentlog.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentlogService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  private http: HttpClient) { }

  private pLogUrl = environment.API_URL + "/payment-log";


  createPaymentLog(paymentLog: any) {
    return this.http.post<IPaymentLog>(this.pLogUrl, paymentLog, this.httpOptions);
  }

  getPaymentLogsByOrderId(orderId: string):Observable<IPaymentLog[]> {
    const url = `${this.pLogUrl}/${orderId}`;
    return this.http.get<IPaymentLog[]>(url, this.httpOptions);
  }

  getAllPaymentLogs() {
    return this.http.get(this.pLogUrl, this.httpOptions);
  }

  updatePaymentLogById(paymentLog: IPaymentLog) {
    const url = `${this.pLogUrl}/${paymentLog._id}`;
    return this.http.put(url, paymentLog, this.httpOptions);
  }

}
