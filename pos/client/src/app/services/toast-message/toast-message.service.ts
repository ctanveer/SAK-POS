import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor() { }

  message = new Subject<{message: string, type: 'success' | 'error' | 'info' | 'warn'}>();
  latestMessage: string = '';

  setMessage (message: string, type: 'success' | 'error' | 'info' | 'warn') {
    this.latestMessage = message;
    this.message.next({ message, type });
  }

  getMessages () {
    return this.message;
  }
}
