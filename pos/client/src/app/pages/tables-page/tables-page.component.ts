import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { IOrder } from '../../models/order.model';
import { ITableLog } from '../../models/tablelog.model';
import { TableService } from '../../services/table.service';
import { OrderService } from '../../services/order.service';
import { TablelogService } from '../../services/tablelog.service';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrl: './tables-page.component.css'
})
export class TablesPageComponent implements OnInit{
  tables:ITable[] = [];
  selectedTable:ITable | null = null;
  statusTypes = ['open', 'occupied', 'reserved', 'closed'];
  visible = false;
  selectedStatus: 'open' | 'occupied' | 'reserved' | 'closed' = 'open';
  createdOrder: IOrder | null = null;
  createdTableLog: ITableLog | null = null;

  constructor(private tableService: TableService, private tablelogService : TablelogService, private orderService: OrderService){};

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      console.log(data);
    })

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
    console.log(this.selectedTable);
    if (this.selectedTable) {
      if (this.selectedTable.status === 'open' && this.selectedStatus === 'occupied') {
        this.selectedTable.status = this.selectedStatus;
        this.tableService.updateTable(this.selectedTable).subscribe(data => {
          let index = this.tables.findIndex(table => table._id === data._id);
          if (index !== -1) {
            this.tables[index] = data;
          } 
        });

        this.orderService.createOrder({waiterId: 10}).subscribe(order => {
          this.createdOrder = order;
        });
        
        //issue here
        this.tablelogService.createTablelog({tableId: this.selectedTable._id, orderId: this.createdOrder?._id, waiterId: 10}).subscribe(tlog => {
          this.createdTableLog = tlog;
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
