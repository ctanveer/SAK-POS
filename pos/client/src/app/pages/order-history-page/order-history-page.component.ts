import { Component, OnInit } from '@angular/core';
import { IOrderHistory } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrl: './order-history-page.component.css'
})
export class OrderHistoryPageComponent implements OnInit{

  allOrders: IOrderHistory[] = [];
  tableLoading: boolean = true;
  constructor (private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.allOrders = data;
      this.allOrders.forEach(data => data.expand = false);
      this.tableLoading = false;
    })
  }

  formatDateToString(date: Date): string {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'GMT'
    });
    return formattedDate;
  };

  getDate(date: Date): string {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      dateStyle: 'long',
      timeZone: 'GMT'
    });
    return formattedDate;
  };

  getOrderStatusColor(status: string) {
    switch (status) {
      case 'pending':
          return '#3b5999';
      case 'preparing':
          return '#f50';
      case 'ready':
          return '#87d068';
      case 'served':
          return '#108ee9';
      case 'complete':
          return 'black';
      case 'cancel':
          return '#ae2029';     
      default:
          return 'black';
    } 
  }
}
