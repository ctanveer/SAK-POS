import { Injectable } from '@angular/core';
import { reservationsList } from '../mock-reservations';
import { IReservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  getReservations():IReservation[] {
    return reservationsList;
  }

}
