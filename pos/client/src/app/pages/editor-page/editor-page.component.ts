import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.css'
})
export class EditorPageComponent implements OnInit{
  tables:ITable[] = [];
  selectedTable:ITable | null = null;
  tableTypes = ['square', 'rectangle', 'round', 'oval'];
  
  // Table Editor Variables
  editVisible = false;
  selectedTableToEdit: ITable | null = null;

  // Table Adder Variables
  adderVisible = false;
  newTableName: string | null = null;
  newTableType: 'square'| 'rectangle' | 'round' | 'oval' | null = null;
  newTableSeats: number | null = null; 

  constructor(private tableService: TableService){}

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      console.log(data);
    })

  }

  getSeatInputData (type: "square" | "round" | "rectangle" | "oval" | null) {
    if (type === 'square' || type === "round") return { min: 2, max: 4, step: 1};
    else return { min: 4, max: 8, step: 2};
  }

  getTableImage (type: "square" | "round" | "rectangle" | "oval", seats: number) {
    return `../../../assets/svg/tables/open/${type}-${seats}.svg`
  }

  addNewTable (
    name: string | null,
    type: 'square' | 'rectangle' | 'round' | 'oval' | null, 
    seats: number | null
    ) {
    //const id = Date.now().toString();
    //id,
    if (name && type && seats) {
      const status = 'open';
      const restaurantId= 1; //needs to be changed later
      const data = {
        name,
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
    }
    
    //this.setSelectedTable(data);
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
      case 'round':
        return { min: 2, max: 4, step: 1 };
      case 'rectangle':
        return { min: 4, max: 8, step: 2 };
      case 'oval':
        return { min: 4, max: 8, step: 2 };
      default:
        return { min: 2, max: 4, step: 1 };
    }
  }

  openTableAddDrawer(): void {
    this.adderVisible = true;
    this.newTableName = this.getNextTableName();
  }

  closeAdderDrawer(): void {
    this.newTableName = null;
    this.newTableType = null;
    this.newTableSeats = null;
    this.adderVisible = false;
  }


  // open(): void {
  //   this.editVisible = true;
  // }

  closeEditDrawer(): void {
    //this.editVisible = false;
    this.setSelectEditTable(null);
  }

  setSelectEditTable (table: ITable | null) {
    this.selectedTableToEdit = table;
    if (this.selectedTableToEdit) this.editVisible = true;
    else this.editVisible = false;
    console.log(this.selectedTableToEdit)
  }

  updateTable (table: ITable) {
    this.tableService.updateTable(table).subscribe(data => {
      let index = this.tables.findIndex(table => table._id === data._id);
      if (index !== -1) {
        this.tables[index] = data;
      } 
    });
  }

  deleteTable (table: ITable) {
    this.tableService.deleteTable(table).subscribe(data => {
      let index = this.tables.findIndex(table => table._id === data._id);
      if (index !== -1) {
        this.tables.splice(index,1);
      }
    })
  }
}
