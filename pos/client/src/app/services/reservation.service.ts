import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationInterface } from '../models/reservation.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) { }

  private reservationUrl = environment.API_URL + "/reservation";


  getAllReservationsForToday(restaurantId: number | null):Observable<ReservationInterface[]> {
    const url = `${this.reservationUrl}/today/${restaurantId}`;
    return this.http.get<ReservationInterface[]>(url, this.httpOptions);
  }

  getAllReservations(restaurantId: number | null):Observable<ReservationInterface[]> {
    const url = `${this.reservationUrl}/all/${restaurantId}`;
    return this.http.get<ReservationInterface[]>(url, this.httpOptions);
  }

  updateReservationStatus(reservation: ReservationInterface ,restaurantId:number): Observable<ReservationInterface> {
    const url = `${this.reservationUrl}/status-update/${restaurantId}`;
    return this.http.put<ReservationInterface>(url, {reservation}, this.httpOptions);
  }
}
