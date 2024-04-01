import { Component, OnInit } from '@angular/core';
import { ReservationInterface } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { TableService } from '../../services/table.service';
import { ITable } from '../../models/table.model';
import { IUser } from '../../models/user.model';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.css'
})
export class ReservationPageComponent implements OnInit {
  
  user: IUser | undefined;
  userId: number | undefined;
  restaurantId: number | null = null;
  
  tables: ITable[] = [];
  reservationList: ReservationInterface[] | null = null;
  todaysReservationList: ReservationInterface[] | null = null;
  tableList: ITable[] | null = null;
  currentDate: number = 1;
  parsedDate: string | null = null;

  isReservationLoaded: boolean = true;

  showList: boolean = false;

  resListOne: any = [
    {
        _id: "62415f4d5e00d64c4c3d96e2",
        customerName: "John Darkin",
        customerEmail: "johnd12@gmail.com",
        tableNumber: 3,
        startTime: new Date("2024-03-11T18:00:00"),
        endTime: new Date("2024-03-11T19:00:00"),
        currentStatus: "Reserved"
    },
    {
        _id: "62415f4d5e00d71dec3d04e7",
        customerName: "Jane Smith",
        customerEmail: "janesmith@gmail.com",
        tableNumber: 5,
        startTime: new Date("2024-03-11T19:00:00"),
        endTime: new Date("2024-03-11T20:15:00"),
        currentStatus: "Reserved"
    },
    {
        _id: "63221f4a7e67d71dec3d28be",
        customerName: "Alice Johnson",
        customerEmail: "alicej@gmail.com",
        tableNumber: 1,
        startTime: new Date("2024-03-11T17:30:00"),
        endTime: new Date("2024-03-11T19:30:00"),
        currentStatus: "Reserved"
    },
    {
        _id: "63156f4a7e67d713aa3d28bf",
        customerName: "Bob Williams",
        customerEmail: "bobwilliams@gmail.com",
        tableNumber: 2,
        startTime: new Date("2024-03-11T20:00:00"),
        endTime: new Date("2024-03-11T21:30:00"),
        currentStatus: "Reserved"
    },
    {
        _id: "63156f4a7e67d713aa3e177c",
        customerName: "Emily Brown",
        customerEmail: "emilyb@gmail.com",
        tableNumber: 4,
        startTime: new Date("2024-03-11T18:30:00"),
        endTime: new Date("2024-03-11T19:30:00"),
        currentStatus: "Reserved"
    }
];

  constructor(private reservationService: ReservationService, private tableService: TableService, private auth: AuthApiService){};

  ngOnInit(): void {

    this.auth.getUser().subscribe(data => {
      this.user = data.user;
      this.userId = this.user.employeeInformation.position.employeeId;
      this.restaurantId = this.user.employeeInformation.restaurantId;
      // this.tableService.getAllTables().subscribe((data) =>{
      //   this.tables = data;
      //   this.reservationService.getAllReservationsForToday(this.restaurantId).subscribe(data => {
      //     this.todaysReservationList = data;
      //     console.log('Todays Reservation List: ', this.todaysReservationList);
      //     this.isReservationLoaded = false;
      //   })
      //   this.reservationService.getAllReservations(this.restaurantId).subscribe(data => {
      //     this.reservationList = data;
      //   })
      // })
      interval(3000).subscribe(() => {
        this.showList = true;
      })
    });

    this.tableService.getAllTables().subscribe(data => this.tableList = data);
    this.currentDate = Date.now();
  }

  getTableName(tableId: string) {
    if (this.tableList) {
      const foundTable = this.tableList.find(obj => obj._id === tableId);
      if(foundTable) return foundTable.name;
    }
    return;
  }

  formatDateToString(date: Date): string {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'GMT'
    });
    return formattedDate;
  };

  getDate(date: Date): string {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      dateStyle: 'long',
      timeZone: 'GMT'
    });
    return formattedDate;
  };

  padZero(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  handleStatusChange(data: ReservationInterface) {
    data.status = 'no-show';
    this.reservationService.updateReservationStatus(data, parseInt(data.restaurantId));
  }

  
}
