import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) { }

  authenticate (code: string) {
    return this.http.get(environment.API_URL + '/auth/token/' + code);
  }
}
