import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { IOrder } from '../../models/order.model';
import { ITableLog } from '../../models/tablelog.model';
import { TableService } from '../../services/table.service';
import { OrderService } from '../../services/order.service';
import { TablelogService } from '../../services/tablelog.service';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';
import { ReservationService } from '../../services/reservation.service';
import { IReservation, ReservationInterface } from '../../models/reservation.model';
import { interval } from 'rxjs';
import { HrService } from '../../services/hr.service';
import { ITLogPopulated } from '../../models/tlog.populated.model';
import { IItem } from '../../models/item-interfaces/item.model';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrl: './tables-page.component.css'
})
export class TablesPageComponent implements OnInit{
  
  user: IUser | undefined;
  userId: number | undefined;
  restaurantId: number | null = null;
  tables: ITable[] = [];
  selectedTable:ITable | null = null;
  statusTypes = ['open', 'occupied', 'reserved', 'closed'];
  visible = false;
  selectedStatus: 'open' | 'occupied' | 'reserved' | 'closed' = 'open';
  createdOrder: IOrder | null = null;
  currentTableLog: any = null;
  reservationList: IReservation[] | null = null;

  todaysReservationList: ReservationInterface[] | null = null;
  currentTable: ITable | null = null;

  notificationVisible:boolean = false;
  ongoingTableLogs: any | null = null;

  constructor(
    private auth: AuthApiService, 
    private tableService: TableService, 
    private tablelogService : TablelogService, 
    private orderService: OrderService, 
    private reservationService: ReservationService, 
    private hrService: HrService, 
    private router: Router,
    private socket: SocketService
  ){};

  private intervalId: any;

  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      this.user = data.user;
      this.userId = this.user.employeeInformation.position.employeeId;
    });
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      this.reservationList = this.reservationService.getReservations();
      console.log('Current time is', Date.now());
      this.reservationChecker();
    });


    //UNCOMMENT WHEN READY
    /*
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      if (this.user) {
        this.reservationService.getAllReservationsForToday(this.user.employeeInformation.restaurantId).subscribe(data => {
          this.todaysReservationList = data;
          console.log('Current time is', Date.now());
          this.reservationChecker();
        });
      }
    });
    */

    this.getAllOngoingTablelogs();

    interval(60000).subscribe(() => {
      this.reservationChecker();
      this.getAllOngoingTablelogs();
    })

    this.socket.getOrderStatusChange().subscribe(data => {
      const index = this.ongoingTableLogs.data.findIndex((item: any) => item.orderInfo._id === data.order._id);
      if (index > -1) this.ongoingTableLogs.data[index].status = data.order.status;
    })
  }

  getAllOngoingTablelogs() {
    this.tablelogService.getOngoingTableLogs().subscribe(data => {
      this.ongoingTableLogs = data;
      console.log('Ongoing table logs are: ', this.ongoingTableLogs.data);
    })
  }

  getOrderStatusColor(status: string) {
    switch (status) {
      case 'pending':
          return '#3b5999';
      case 'preparing':
          return '#f50';
      case 'ready':
          return '#87d068';
      case 'served':
          return '#108ee9';
      case 'complete':
          return 'black';      
      default:
          return 'black';
    } 
  }

  reservationChecker() {
    const currentTime = Date.now();
    console.log('NOW is: ', currentTime);
    if (this.reservationList) {
      for (let i = 0; i < this.reservationList.length; i++) {
        let reservation = this.reservationList[i];
        // console.log('Current reservation object is: ', reservation);
        let tableIndex = this.tables.findIndex(table => {
          return table._id === reservation.tableId;
        });
        if (tableIndex !== -1) {
          if (this.tables[tableIndex].status === 'open' && reservation.status === 'reserved') {
            //Adding 15 mins to currentTime
            if ((currentTime + 900000 >= reservation.reservationTime.startTime) && 
            (currentTime <= reservation.reservationTime.endTime)) {
              this.tables[tableIndex].status = 'reserved';
              this.tableService.updateTable(this.tables[tableIndex]).subscribe(table => {
                this.tables[tableIndex] = table;
                console.log(`${this.tables[tableIndex].name} status changed from open to reserved. Current time is ${currentTime} and reservation time is ${reservation.reservationTime.startTime}`);
              });
            }
          }
          else if (this.tables[tableIndex].status === 'reserved' && reservation.status === 'reserved') {
            //Adding 10 mins to resrvation start time
            if (currentTime.valueOf() > (reservation.reservationTime.startTime + 600000) &&
            (currentTime <= reservation.reservationTime.endTime)) {
              this.tables[tableIndex].status = 'open';
              this.tableService.updateTable(this.tables[tableIndex]).subscribe(table => {
                this.tables[tableIndex] = table;
                console.log(`Customer No-show ${this.tables[tableIndex].name} status changed from reserved to open. Current time is ${currentTime} and reservation time is ${reservation.reservationTime.startTime}`);
            });
              reservation.status = 'no-show';
              this.reservationService.updateReservation(reservation);
            }
          }
          else if (this.tables[tableIndex].status === 'reserved' && reservation.status === 'cancelled') {
            this.tables[tableIndex].status = 'open';
            this.tableService.updateTable(this.tables[tableIndex]).subscribe(table => {
              this.tables[tableIndex] = table;
              console.log(`Reservation Cancelled. ${this.tables[tableIndex].name} status changed from reserved to open. Current time is ${currentTime} and reservation time is ${reservation.reservationTime.startTime}`);
          });
          }
        }
      }
    }
  }

  proceedToOrder() {
    if (this.selectedTable) {
      this.orderService.generateOrderForTable(this.selectedTable._id!).subscribe(order => {
        console.log('Order:', order);
        this.router.navigate(['order'], { 
          state: { 
            orderId: order._id, 
            tableId: this.selectedTable ? this.selectedTable._id! : '1',
            tableName: this.selectedTable?.name,
            orderStatus: order.status,
            order,
            status: order.orderPosted ? 'update' : 'new'
          }
        });

      })
    }
    // Add order generation here.
  }

  moveToOrderPage(data: any) {
    console.log('Data is: ', data);
    this.router.navigate(['order'], { 
      state: { 
        orderId: data.orderId, 
        tableId: data.tableId,
        tableName: data.tableInfo[0].name,
        orderStatus: data.orderInfo[0].status,
        order: data.orderInfo[0],
        status: data.orderInfo[0].orderPosted ? 'update' : 'new'
      }
    });
  }

  getTableImage (table: ITable) {
    return `../../../assets/svg/tables/${table.status}/${table.type}-${table.seats}.svg`
  }

  getSelectedTableImage () {
    if (this.selectedTable)
      return `../../../assets/svg/tables/${this.selectedStatus}/${this.selectedTable.type}-${this.selectedTable.seats}.svg`;
    return ''
  }

  getStatusColor(status: string): string {
    switch (status) {
        case 'open':
            return 'white';
        case 'occupied':
            return '#d7ffde';
        case 'reserved':
            return '#ffeabd';
        case 'closed':
            return '#ffd7cf';
        default:
            return 'white';
    }
  }

  setSelectedTable (table: ITable | null) {
    this.selectedTable = table;
    if (table) this.selectedStatus = table.status;
    console.log(this.selectedTable);
    this.open();
  }

  /*
  changeTableStatus() {
    console.log('Selected table is: ', this.selectedTable);
    if (this.selectedTable) {
      //open OR reserved --> occupied
      if (this.selectedTable.status === 'open' || this.selectedTable.status === 'reserved') {
        if (this.selectedStatus === 'occupied') {
          this.selectedTable.status = this.selectedStatus;
          this.tableService.updateTable(this.selectedTable).subscribe(data => {
            let index = this.tables.findIndex(table => table._id === data._id);
            if (index !== -1) {
              this.tables[index] = data;
            }
            console.log('Current table is: ', this.tables[index]);
          });
  
          //customerId should be optional when open -> occupied, but grab it from reservation list when reserved -> occupied
          this.tablelogService.createTablelog({tableId: this.selectedTable._id, waiterId: this.userId, customerId: 44}).subscribe(tableLog => {
            this.currentTableLog = tableLog;
            console.log('Created Table Log is: ', this.currentTableLog);
          })
        }
      } 
      // else if ((this.selectedTable.status === 'open' || this.selectedTable.status === 'closed') && (this.selectedStatus === 'open' || this.selectedStatus === 'closed')) {

      // }
      else {
        this.selectedTable.status = this.selectedStatus;
      }
    }
  }
  */

  tableStatusHelper(currentStatus: string, newStatus: string) {
    if (this.selectedTable) {
      this.selectedTable.status = this.selectedStatus;
      this.tableService.updateTable(this.selectedTable).subscribe(data => {
        let index = this.tables.findIndex(table => table._id === data._id);
        if (index !== -1) {
          this.tables[index] = data;
          this.currentTable = data;
        }
        console.log('Current table is: ', this.currentTable);
      });
    }    
  }

  changeTableStatus() {
    console.log('Selected table is: ', this.selectedTable);
    if (this.selectedTable) {
      //open OR reserved --> occupied
      if ((this.selectedTable.status === 'open' || this.selectedTable.status === 'reserved') && this.selectedStatus === 'occupied') { 
          
          this.tableStatusHelper(this.selectedTable.status, 'occupied');
          this.tablelogService.createTablelog({tableId: this.selectedTable._id, waiterId: this.userId, customerId: 44}).subscribe(tableLog => {
            this.currentTableLog = tableLog;
            console.log('Created Table Log is: ', this.currentTableLog);
          })
        
      } 
      else if ((this.selectedTable.status === 'open' || this.selectedTable.status === 'closed') && (this.selectedStatus === 'closed' || this.selectedStatus === 'open')) {
        this.tableStatusHelper(this.selectedTable.status, this.selectedStatus);
      }
      // occupied --> open
      else if (this.selectedTable.status === 'occupied' && this.selectedStatus === 'open') {
        this.tableStatusHelper(this.selectedTable.status, this.selectedStatus);
        console.log('Closing this table: ', this.currentTable)
        if (this.selectedTable) {
          this.tablelogService.getTableLogByTableId(this.selectedTable).subscribe(data => {
            this.currentTableLog = data;
            this.currentTableLog.status = 'closed';
            this.currentTableLog.timeElapsed = Date.now() - this.currentTableLog.createdAt;
            this.tablelogService.updateTableLogById(this.currentTableLog).subscribe(data => {
              console.log('Updated Table log is: ', data);
              
              this.hrService.getTableLogByOrderId(data as ITableLog).subscribe(data => {
                console.log('Populated Table Log is: ', data);
                const items = data.orderId?.items;
                let readyToServeTime = 1;
                let waiterData = undefined;
                
                if (data.orderId?.servedTimestamp && data.orderId.readyTimestamp) {
                  readyToServeTime = (new Date(data.orderId?.servedTimestamp).getTime() - new Date(data.orderId?.readyTimestamp).getTime()) / 60000
                }
                
                if (items) {
                  waiterData = {
                    date: data.createdAt,
                    orderId: data.orderId?._id,
                    preparationTime: this.calculatePreparationTime(items),
                    orderReadyToServeTime: readyToServeTime.toFixed(2),
                    bill: data.orderId?.bill,
                    occupiedToCompleteTime: (data.timeElapsed/60000).toFixed(2),
                    waiterId: data.waiterId,
                    restaurantId: data.tableId.restaurantId
                  }
                }
                console.log('Prepared Waiter Data in FE is: ', waiterData);

                this.hrService.postOrderDataToHR(waiterData).subscribe(data => {
                  console.log('Waiter Data for HR is: ', data);
                });
              })
            })
          })
        }
      }
      else {
        this.selectedTable.status = this.selectedStatus;
      }
    }
  }

  calculatePreparationTime(items: IItem[]) {
    const time = items.reduce((acc, item) => {
      let totalTime
      const quantity = item.item.itemQuantity;
      if (quantity) {
        totalTime = quantity * item.item.itemPreparationTime; 
        return acc + totalTime;
      }
      return acc;
    }, 0)

    return time;
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.selectedTable = null;
  }

  openPanel() {
    this.notificationVisible = true;
  }

  closePanel() {
    this.notificationVisible = false;
  }


}
