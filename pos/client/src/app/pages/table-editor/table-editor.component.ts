import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrl: './table-editor.component.css'
})
export class TableEditorComponent{

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