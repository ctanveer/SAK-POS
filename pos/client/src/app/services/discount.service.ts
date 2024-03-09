import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IDiscount } from '../models/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  discountUrl = environment.API_URL + "/discount";

  getDiscount(): Observable<IDiscount> {
    const url = `${this.discountUrl}/menu-discount`;
    return this.http.get<IDiscount>(url, this.httpOptions);
  }
}
