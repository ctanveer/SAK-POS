import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { IOrder } from '../../models/order.model';
import { ITableLog } from '../../models/tablelog.model';
import { TableService } from '../../services/table.service';
import { OrderService } from '../../services/order.service';
import { TablelogService } from '../../services/tablelog.service';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrl: './tables-page.component.css'
})
export class TablesPageComponent implements OnInit{
  
  user: IUser | undefined;
  userId: number | undefined;
  tables:ITable[] = [];
  selectedTable:ITable | null = null;
  statusTypes = ['open', 'occupied', 'reserved', 'closed'];
  visible = false;
  selectedStatus: 'open' | 'occupied' | 'reserved' | 'closed' = 'open';
  createdOrder: IOrder | null = null;
  createdTableLog: ITableLog | null = null;

  constructor(private auth: AuthApiService, private tableService: TableService, private tablelogService : TablelogService, private orderService: OrderService, private router: Router){};

  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      this.user = data.user;
      this.userId = this.user.employeeInformation.position.employeeId;
      console.log('Current user is: ', this.user.employeeInformation.position.employeeId);
    });
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      console.log(data);
    })

  }

  generateOrder() {
    // Add order generation here.
    this.router.navigate(['order'], { state: { orderId: this.createdOrder ? this.createdOrder._id! : '1', tableId: this.selectedTable ? this.selectedTable._id! : '1'}});
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

  changeTableStatus() {
    console.log('Selected table is: ', this.selectedTable);
    if (this.selectedTable) {
      if (this.selectedTable.status === 'open' && this.selectedStatus === 'occupied') {
        this.selectedTable.status = this.selectedStatus;
        this.tableService.updateTable(this.selectedTable).subscribe(data => {
          let index = this.tables.findIndex(table => table._id === data._id);
          if (index !== -1) {
            this.tables[index] = data;
          }
          console.log('Current table is: ', this.tables[index]);
        });

        this.orderService.createNewOrder({waiterId: this.userId}).subscribe(order => {
          this.createdOrder = order;
          console.log('Created Order is: ', this.createdOrder);
        });
        
        //issue here
        this.tablelogService.createTablelog({tableId: this.selectedTable._id, orderId: this.createdOrder?._id, waiterId: this.userId}).subscribe(tlog => {
          this.createdTableLog = tlog;
          console.log('Created Table Log is: ', this.createdTableLog);
        })
      }
      else {
        this.selectedTable.status = this.selectedStatus;
      }
    }
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.selectedTable = null;
  }


}
