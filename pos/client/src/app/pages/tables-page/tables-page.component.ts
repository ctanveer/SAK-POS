import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { TableService } from '../../services/table.service';

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
  selectedStatus: string | null = null;

  constructor(private tableService: TableService){};

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      console.log(data);
    })

  }

  setSelectedTable (table: ITable | null) {
    this.selectedTable = table;
    console.log(this.selectedTable);
    this.open();
  }

  changeTableStatus() {
    console.log(this.selectedTable);
    if (this.selectedTable) {
      if (this.selectedTable.status === 'open' && this.selectedStatus === 'occupied') {
        
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
