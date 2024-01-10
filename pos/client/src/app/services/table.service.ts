import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITable } from '../models/table.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(  private http: HttpClient) { }

  private tableUrl = environment.API_URL + "/table";

  getAllTables (): Observable<any> {
    return this.http.get<ITable[]>(this.tableUrl);
  }

  addTable(table: ITable): Observable<any> {
    return this.http.post<ITable>(this.tableUrl, table, this.httpOptions);
  }

  updateTable(table: ITable): Observable<any> {
    const url = `${this.tableUrl}/${table._id}`;
    return this.http.put<ITable>(url, table, this.httpOptions);
  }

  deleteTable(table: ITable): Observable<any> {
    const url = `${this.tableUrl}/${table._id}`;
    return this.http.delete<ITable>(url, this.httpOptions)
  }

}
