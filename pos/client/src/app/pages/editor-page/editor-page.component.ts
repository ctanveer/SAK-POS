import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { TableService } from '../../services/table.service';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrl: './editor-page.component.css'
})
export class EditorPageComponent implements OnInit{
  tables:ITable[] = [];
  user: IUser | undefined;
  restaurantId: number | undefined;
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

  isEditorLoaded: boolean = true;

  constructor(private tableService: TableService, private auth: AuthApiService){}

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe((data) =>{
      this.tables = data;
      this.isEditorLoaded = false;
    })

    this.auth.getUser().subscribe(data => {
      this.user = data.user;
      this.restaurantId = data.user.employeeInformation.restaurantId;
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
    if (name && type && seats) {
      const status = 'open';
      const restaurantId= this.restaurantId;
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
        //sort tables in ascending order
        this.tables = this.tables.sort((tableA, tableB) => {
          const numA = parseInt(tableA.name.split(' ')[1]);
          const numB = parseInt(tableB.name.split(' ')[1]);
          return numA - numB;
        });
      })
    
    }
    
  }

  findMissingNumbers(sequence: number[]) {
    const missingNumbers = [];
    let expectedNumber = sequence[0] - 1;

    for (const num of sequence) {
        while (++expectedNumber < num) {
            missingNumbers.push(expectedNumber);
        }
        expectedNumber = num;
    }

    return missingNumbers;
  }

  getNextTableName() {
    if (this.tables.length > 0) {
      const tableNumbers = this.tables.map(tableName => parseInt(tableName.name.split(' ')[1]));
      tableNumbers.sort((a, b) => a - b);
      const missingNumber = this.findMissingNumbers(tableNumbers);
      if (missingNumber.length > 0) {
        return `Table ${missingNumber[0]}`
      }

      const nextTableNumber = tableNumbers[tableNumbers.length - 1] + 1;
      return `Table ${nextTableNumber}`;
    } 
    else return 'Table 1'
  
  }

  setSelectedTable (table: ITable| null) {
    this.selectedTable = table;
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


  closeEditDrawer(): void {
    this.setSelectEditTable(null);
  }

  setSelectEditTable (table: ITable | null) {
    this.selectedTableToEdit = table;
    if (this.selectedTableToEdit) this.editVisible = true;
    else this.editVisible = false;
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
