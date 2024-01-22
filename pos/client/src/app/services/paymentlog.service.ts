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


  createPaymentLog(paymentLog: any):Observable<any> {
    return this.http.post(this.pLogUrl, paymentLog, this.httpOptions);
  }

  getPaymentLogsByOrderId(orderId: string):Observable<any> {
    const url = `${this.pLogUrl}/${orderId}`;
    return this.http.get(url, this.httpOptions);
  }

  getAllPaymentLogs():Observable<any> {
    return this.http.get(this.pLogUrl, this.httpOptions);
  }

  updatePaymentLogById(paymentLog: IPaymentLog) {
    const url = `${this.pLogUrl}/${paymentLog._id}`;
    return this.http.put(url, paymentLog, this.httpOptions);
  }

}
