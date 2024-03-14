import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ICategories } from '../models/item-interfaces/categories.model';
import { IItem } from '../models/item-interfaces/item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

  private menuUrl = environment.API_URL + "/menu";

  getCategories(): Observable<ICategories[]> {
    const url = `${this.menuUrl}/categories`;
    return this.http.get<ICategories[]>(url, this.httpOptions);
  }

  getMenu(): Observable<IItem[]> {
    const url = `${this.menuUrl}/menuitems`;
    return this.http.get<IItem[]>(url, this.httpOptions);
  }

}
