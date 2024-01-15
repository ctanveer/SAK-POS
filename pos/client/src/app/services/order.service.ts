import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IOrderListInterface } from '../models/item-interfaces/posOutput/orderList.model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  private http: HttpClient) { }

  private orderUrl = environment.API_URL + "/order";

  createNewOrder(order: any):Observable<any> {
    return this.http.post(this.orderUrl, order, this.httpOptions);
  }


  createOrder(order: any):Observable<any> {
    const url = `${this.orderUrl}/new`;
    return this.http.post(url, { order }, this.httpOptions);
  }

  // postOrder(order:IOrderListInterface):Observable<any> {
    
  // }
}
