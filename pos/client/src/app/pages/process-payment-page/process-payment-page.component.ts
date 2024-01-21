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
  pmtModeArr: string[] = [];
  currentIndex: number = -1;
  isCashPayVisible: boolean = false;
  isCardPayVisible: boolean = false;

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

  changePmtMode(index: number, value: string) {
    // this.billArr[index].pmtMode = this.pmtModeArr[index];
    console.log('Index at Chnage payment mode is: ', index);
    this.billArr[index].pmtMode = value;
  }

  completePayment(index: number) {
    console.log('Index at complete payment is: ', index);
    this.currentIndex = index;
    if (this.billArr[this.currentIndex].pmtMode === 'cash') {
      this.isCashPayVisible = true;
    }
    else if (this.billArr[this.currentIndex].pmtMode === 'card') {
      this.isCardPayVisible = true;
    } 

  }
  
  handleCancel() {
    console.log('Current index at cancel is: ', this.currentIndex);
    if (this.currentIndex >= 0) {
      if (this.billArr[this.currentIndex].pmtMode === 'cash') {
        this.currentIndex = -1;
        this.isCashPayVisible = false;
      }
      else if (this.billArr[this.currentIndex].pmtMode === 'card') {
        this.currentIndex = -1;
        this.isCardPayVisible = false;
      }
    }
  }

  handleOk() {
    console.log('Current index at ok is: ', this.currentIndex);
    if (this.currentIndex >= 0) {
      if (this.billArr[this.currentIndex].pmtMode === 'cash') {
        this.billArr[this.currentIndex].paid = true;
        this.currentIndex = -1;
        this.isCashPayVisible = false;
      }
      else if (this.billArr[this.currentIndex].pmtMode === 'card') {
        this.billArr[this.currentIndex].paid = true;
        this.currentIndex = -1;
        this.isCardPayVisible = false;
      }
    }
  }

  isAllPaid () {
    return this.billArr.every(bill => bill.paid === true);
  }
}
