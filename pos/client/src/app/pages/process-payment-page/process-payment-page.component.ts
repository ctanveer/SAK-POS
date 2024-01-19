import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUser } from '../../models/user.model';
import { IBill } from '../../models/bill.model';

@Component({
  selector: 'app-process-payment-page',
  templateUrl: './process-payment-page.component.html',
  styleUrl: './process-payment-page.component.css'
})
export class ProcessPaymentPageComponent implements OnInit {

  billArr: IBill[] = [];
  totalBillWithTip: number | null = null;
  user: IUser | undefined;

  constructor (private router: Router, private location: Location) {}
  
  ngOnInit(): void {
    const state = this.location.getState() as {billArr: IBill[], bill: number, user: IUser}
    if (!state || !state.billArr || !state.bill || !state.user) this.router.navigate(['payment']);
    else {
      this.billArr = state.billArr;
      this.totalBillWithTip = state.bill;
      this.user = state.user;
    }
  }

  
}
