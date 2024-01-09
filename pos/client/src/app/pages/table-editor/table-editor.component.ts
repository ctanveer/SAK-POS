import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrl: './table-editor.component.css'
})
export class TableEditorComponent implements OnInit{
  tables:ITable[] = [];
  selectedTable:ITable | null = null;
  selectTableToEdit: ITable | null = null;

  constructor(private tableService: TableService){}

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      console.log(data);
    })

  }


  addNewTable (type: 'square' | 'rectangle' | 'circle' | 'oval' , status: 'open' | 'reserved' | 'occupied' | 'closed') {
    //const id = Date.now().toString();
    //id,
    const seats = 4;
    const restaurantId= 1; //needs to be changed later
    const data = {
      name: this.getNextTableName(),
      restaurantId,
      type,
      seats,
      position: {
        x: 50,
        y: 50,
        rotation: 0
      },
      status
    }
    this.tableService.addTable(data as ITable).subscribe(table => {
      this.tables.push(table);
    })
    this.setSelectedTable(data);
  }

  getNextTableName () {
    const latestTable = this.tables[this.tables.length];

    if (latestTable && latestTable.name.includes('Table')) {
      return `Table ${Number(latestTable.name.split(' ')[1]) + 1}`
    }
    return `Table ${this.tables.length + 1}`;
  }

  setSelectedTable (table: ITable| null) {
    this.selectedTable = table;
    //console.log(this.selectedTable);
    console.log(this.tables);
  }

  getSeatData () {
    switch (this.selectedTable && this.selectedTable.type) {
      case 'square':
        return { min: 2, max: 4, step: 1 };
      case 'circle':
        return { min: 2, max: 4, step: 1 };
      case 'rectangle':
        return { min: 4, max: 8, step: 2 };
      case 'oval':
        return { min: 4, max: 8, step: 2 };
      default:
        return { min: 2, max: 4, step: 1 };
    }
  }

  setEditTable (table: ITable | null) {
    this.selectTableToEdit = table;
    console.log(this.selectTableToEdit)
  }

  updateTable (table: ITable) {
    console.log('table is:',table);
    this.tableService.updateTable(table).subscribe();
  }

}


    // const data = localStorage.getItem('tables');
    // if (data) {
    //   const parsedData = JSON.parse(data);
    //   // const restructuredData = parsedData.map((item:ITable) => {
    //   //   return {...item, config: {...item.config, draggable: true, image: this.getImage(item.info.type, item.info.seats)}}
    //   // })
    //   // this.tables = restructuredData;

    //   this.tables = parsedData;
    // }