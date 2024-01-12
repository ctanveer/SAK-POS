import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ITable } from '../models/table.model';
import { environment } from '../../environments/environment';
import {menu} from '../mock-menu'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu () {
    return menu;
  }
}
