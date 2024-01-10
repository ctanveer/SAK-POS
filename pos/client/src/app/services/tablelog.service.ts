import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
}
