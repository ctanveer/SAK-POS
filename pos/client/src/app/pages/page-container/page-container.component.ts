import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.css'
})
export class PageContainerComponent implements OnInit {

  constructor (private router: Router) {}

  paths = ['tables','table-editor','order-history'];
  currentPath : string = '/tables';

  ngOnInit(): void {
    this.router.events.subscribe(event => (event instanceof NavigationStart) ? this.currentPath=event.url : null);
  }


  parseName (path: string) {
    return path.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }
  isSelected (path: string) {
    return this.currentPath.slice(1) === path
  }

}
