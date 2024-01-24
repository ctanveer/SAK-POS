import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITableLog } from '../models/tablelog.model';
import { ITLogPopulated } from '../models/tlog.populated.model';

@Injectable({
  providedIn: 'root'
})
export class HrService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private hrUrl = environment.API_URL + "/hr";

  postOrderDataToHR(waiterdata: any) {
    const url = `${this.hrUrl}/waiter-data`;
    return this.http.post(url, waiterdata, this.httpOptions);
  }

  getTableLogByOrderId(tablelog: ITableLog):Observable<ITLogPopulated> {
    const url = `${this.hrUrl}/table-log-data/${tablelog.orderId}`;
    return this.http.get<ITLogPopulated>(url, this.httpOptions);
  }
}
