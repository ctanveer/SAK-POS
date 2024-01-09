import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  authenticate (code: string) {
    return this.http.get(environment.API_URL + '/auth/token/' + code);
  }

  getUser () : Observable<{ user: IUser }> {
    return this.http.get<{ user: IUser }>(environment.API_URL + '/auth/user');
  }
}
