import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITable } from '../../models/table.model';
import { ImageConfig } from 'konva/lib/shapes/Image';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrl: './table-details.component.css'
})
export class TableDetailsComponent {
  @Input() selectedTable!: {info: ITable, config: Partial<ImageConfig>} | null;

  @Output() removeTableEvent = new EventEmitter<ITable>();
  @Output() deselectTableEvent = new EventEmitter();
  @Output() updateTableEvent = new EventEmitter<ITable>();

  removeTable() {
    if (this.selectedTable) {
      this.removeTableEvent.emit(this.selectedTable.info);
    }
  }

  deselectTable() {
    if (this.selectedTable) {
      this.deselectTableEvent.emit();
    }
  }

  getSeatData () {
    switch (this.selectedTable && this.selectedTable.info.type) {
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

  rotateTable (direction: 'clockwise' | 'anti-clockwise') {
    if (this.selectedTable) {
      const current = this.selectedTable.info.position.rotation ?? 0;
      let newRotation : number;

      if (direction === 'clockwise') 
        newRotation = (current + 45) >= 360 ? 0 : (current + 45);
      else
        newRotation = (current - 45) < 0 ? 315 : (current - 45);

      this.selectedTable.info.position.rotation = newRotation;
      this.updateTable(this.selectedTable.info);
    }
  }

  updateTable (table: ITable) {
    this.updateTableEvent.emit(table);
  }
}
