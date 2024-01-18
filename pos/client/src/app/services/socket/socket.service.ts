import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IOrder } from '../../models/order.model';
import { ITable } from '../../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  connect () {
    return this.socket.connect();
  }

  joinRestaurantRoom (restaurantId: number) {
    this.socket.emit('join', { restaurantId });
    return true;
  }

  getReadyOrderNotification() {
    return this.socket.fromEvent<{order: IOrder, table: ITable}>('ready-order');
  }
}
