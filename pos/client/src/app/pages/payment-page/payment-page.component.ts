import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  
  user : IUser | undefined;
  
  constructor ( private auth: AuthApiService){}
  
  ngOnInit(): void {
    this.auth.getUser().subscribe(data => this.user = data.user);
  }

  orderNumber = '8867924';
  total = 26.44;
  paid = 0;
  outstanding = 26.44;
  items = [
    { name: 'Turkey Burger', price: 7.00 },
    { name: 'Pizza', price: 10.00 },
  ];

  finalizePayment() {
    // Implement the logic to finalize the payment
    alert('Payment finalized!');
  }

  splitBill() {
    // Implement the logic to split the bill
    alert('Bill split!');
  }

  voidPayment() {
    // Implement the logic to void the payment
    alert('Payment voided!');
  }

}
