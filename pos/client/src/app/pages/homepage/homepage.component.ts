import { Component } from '@angular/core';
import { IWaiter } from '../../models/waiter.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  paths = ['table-view','table-editor','order-history'];
  currentPath:string = '/table-view'
  
  waiter: IWaiter = {
    id: 22,
    name: "Simon Hoper",
    loginTime: new Date(Date.now()).toISOString()
  }

  parseName (path: string) {
    return path.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }

  isSelected (path: string) {
    return this.currentPath.slice(1) === path
  }
}
