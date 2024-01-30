import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reservationsList } from '../mock-reservations';
import { IReservation, ReservationInterface } from '../models/reservation.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationArr: IReservation[] | null = []

  // constructor() {
  //   this.reservationArr = reservationsList
  // }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient) {
    this.reservationArr = reservationsList
  }

  private reservationUrl = environment.API_URL + "/reservation";


  //*************MAINS******************/
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

  //soon to be obsolete
  getReservations():IReservation[] {
    if (this.reservationArr) {
      console.log('reservation ARRAY is: ', this.reservationArr);
      return this.reservationArr;
    }
    return [];
  }

  //does not work
  updateReservation(reservation: ReservationInterface) {
    console.log('Reservation is: ', reservation);
    if (this.reservationArr) {
      const foundIndex = this.reservationArr.findIndex(obj => {
        console.log('Current Object is: ', obj)
        return obj.reservationId === reservation._id
      });
      if (foundIndex !== -1) {
        console.log('Found index is: ', foundIndex);
        this.reservationArr[foundIndex].status = reservation.status;
      }
    }
  }
}
