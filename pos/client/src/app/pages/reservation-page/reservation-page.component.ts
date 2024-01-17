import { Component, OnInit } from '@angular/core';
import { IReservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { TableService } from '../../services/table.service';
import { ITable } from '../../models/table.model';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.css'
})
export class ReservationPageComponent implements OnInit {
  
  reservationList: IReservation[] | null = null;
  tableList: ITable[] | null = null;
  currentDate: number = 1;
  parsedDate: string | null = null;

  constructor(private reservationService: ReservationService, private tableService: TableService){};

  ngOnInit(): void {
    this.reservationList = this.reservationService.getReservations();
    console.log('Reservations are: ', this.reservationList);
    this.tableService.getAllTables().subscribe(data => this.tableList = data);
    this.currentDate = Date.now();
    console.log(new Date(this.currentDate).toDateString);
  }

  getTableName(tableId: string) {
    if (this.tableList) {
      const foundTable = this.tableList.find(obj => obj._id === tableId);
      if(foundTable) return foundTable.name;
    }
    return;
  }

  dateFormatter(unixTime: number) {
    const date = new Date(unixTime);
    const formattedDate = `${this.padZero(date.getDate())}-${this.padZero(date.getMonth() + 1)}-${date.getFullYear()} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    return formattedDate;
  }

  padZero(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  handleStatusChange(data: IReservation) {
    data.status = 'no-show';
    console.log('Table is: ', this.reservationList);
    this.reservationService.updateReservation(data);
  }

  
}
