import { Injectable } from '@angular/core';
import { reservationsList } from '../mock-reservations';
import { IReservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationArr: IReservation[] | null = []

  constructor() {
    this.reservationArr = reservationsList
   }

  getReservations():IReservation[] {
    if (this.reservationArr) {
      console.log('reservation ARRAY is: ', this.reservationArr);
      return this.reservationArr;
    }
    return [];
  }


  //does not work
  updateReservation(reservation: IReservation) {
    console.log('Reservation is: ', reservation);
    if (this.reservationArr) {
      const foundIndex = this.reservationArr.findIndex(obj => {
        console.log('Current Object is: ', obj)
        return obj.reservationId === reservation.reservationId
      });
      if (foundIndex !== -1) {
        console.log('Found index is: ', foundIndex);
        this.reservationArr[foundIndex].status = reservation.status;
      }
    }
  }
}
