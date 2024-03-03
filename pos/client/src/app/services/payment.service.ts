import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private paymentUrl = environment.API_URL + "/payment";

  preparePayment(paymentData: any): Observable<any> {
    return this.http.post(this.paymentUrl, paymentData, this.httpOptions);
  }
}
