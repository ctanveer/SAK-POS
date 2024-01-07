import { Component, OnInit } from '@angular/core';
import { ITable } from '../../models/table.model';
import { ImageConfig } from 'konva/lib/shapes/Image';
import { StageConfig } from 'konva/lib/Stage';
// import { CoreShapeComponent, StageComponent } from 'ng2-konva';

@Component({
  selector: 'app-order-station',
  templateUrl: './order-station.component.html',
  styleUrl: './order-station.component.css'
})
export class OrderStationComponent implements OnInit{

  tables : {info: ITable, config: Partial<ImageConfig>}[] = [];
  selectedTable : ITable | null = null;

  ngOnInit(): void {
    const data = localStorage.getItem('tables');
    if (data) {
      const parsedData = JSON.parse(data);
      const restructuredData = parsedData.map((item: {info: ITable, config: Partial<ImageConfig>}) => {
        return {...item, config: {...item.config, draggable: false, image: this.getImage(item.info.type, item.info.seats)}}
      })

      this.tables = restructuredData;
    }
  }

  public configStage: Partial<StageConfig> = {
    width: 1000,
    height: 500,
  };

  getImage (type: string, seats: number) {
    const image = new window.Image();
    image.src = '../../../assets/svg/' + type + '-' + seats + '.svg';
    return image;
  }

  setSelectedTable (table: ITable | null) {
    this.selectedTable = table;
  }
}
