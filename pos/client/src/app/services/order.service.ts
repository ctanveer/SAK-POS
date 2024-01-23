import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { IOrderListInterface } from '../models/item-interfaces/posOutput/orderList.model';
import { IItem } from '../models/item-interfaces/item.model';
import { IOrder } from '../models/order.model';

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

  updateOrderItems (orderId: string, items: IItem[]) {
    console.log('Cart before sending: ', items);
    return this.http.put(`${this.orderUrl}/items/${orderId}`, { items }, this.httpOptions);
  }

  updateOrderStatus (orderId: string, status: string) {
    return this.http.post(`${this.orderUrl}/status/${orderId}`, {status: status}, this.httpOptions);
  }

  generateOrderForTable (tableId: string) : Observable<IOrder> {
    return this.http.get<IOrder>(`${this.orderUrl}/log/table/${tableId}`, this.httpOptions);
  }

  updateOrderById (orderId: string, orderObj: any):Observable<any> {
    const url = `${this.orderUrl}/${orderId}`;
    return this.http.put<any>(url, orderObj, this.httpOptions);
  }
}
