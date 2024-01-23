import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ITable } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TablelogService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(  private http: HttpClient) { }

  private tLogUrl = environment.API_URL + "/table-log";

  createTablelog(tableLog: any):Observable<any> {
    return this.http.post(this.tLogUrl, tableLog, this.httpOptions);
  }

  getTableLogByTableId(table: ITable) {
    const url = `${this.tLogUrl}/${table._id}`;
    return this.http.get(url, this.httpOptions);
  }

  updateTableLogById(tableLog: any) {
    const url = `${this.tLogUrl}/${tableLog._id}`;
    return this.http.put(url, tableLog, this.httpOptions);
  }

  getOngoingTableLogs() {
    const url = `${this.tLogUrl}/ongoing`;
    return this.http.get(url, this.httpOptions);
  }
}
