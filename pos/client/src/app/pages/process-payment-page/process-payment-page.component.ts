import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUser } from '../../models/user.model';
import { IBill } from '../../models/bill.model';
import { IPaymentLog } from '../../models/paymentlog.model';
import { PaymentlogService } from '../../services/paymentlog.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-process-payment-page',
  templateUrl: './process-payment-page.component.html',
  styleUrl: './process-payment-page.component.css'
})
export class ProcessPaymentPageComponent implements OnInit {

  billArr: IPaymentLog[] = [];
  totalBillWithTip: number | null = null;
  user: IUser | undefined;
  pmtModeArr: string[] = [];
  currentIndex: number = -1;
  isCashPayVisible: boolean = false;
  isCardPayVisible: boolean = false;
  orderId: string = '';
  
  completeStatus: boolean = false;


  constructor (private router: Router, private location: Location, private paymentLogService: PaymentlogService, private orderService: OrderService) {}
  
  ngOnInit(): void {
    const state = this.location.getState() as {billArr: IPaymentLog[], bill: number, user: IUser}
    if (!state || !state.billArr || !state.bill || !state.user) this.router.navigate(['payment']);
    else {
      this.billArr = state.billArr;
      this.totalBillWithTip = state.bill;
      this.user = state.user;
      this.orderId = state.billArr[0].orderId;
    }
  }

  changePmtMode(index: number, value: string) {
    // this.billArr[index].pmtMode = this.pmtModeArr[index];
    console.log('Index at Change payment mode is: ', index);
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

  updatePaymentLog(pLog: IPaymentLog) {
    this.paymentLogService.updatePaymentLogById(pLog).subscribe(data => {
      console.log('Payment Log is: ', data);
    })
  }

  handleOk() {
    console.log('Current index at ok is: ', this.currentIndex);
    if (this.currentIndex >= 0) {
      if (this.billArr[this.currentIndex].pmtMode === 'cash') {
        this.billArr[this.currentIndex].paid = true;
        this.updatePaymentLog(this.billArr[this.currentIndex]);
        this.currentIndex = -1;
        this.isCashPayVisible = false;
      }
      else if (this.billArr[this.currentIndex].pmtMode === 'card') {
        this.billArr[this.currentIndex].paid = true;
        this.updatePaymentLog(this.billArr[this.currentIndex]);
        this.currentIndex = -1;
        this.isCardPayVisible = false;
      }
    }
  }

  isAllPaid() {
    return this.billArr.every(bill => bill.paid === true);
  }

  paymentComplete() {
    this.completeStatus = true;
    this.orderService.updateOrderById(this.orderId, {bill: this.totalBillWithTip, status: 'complete'}).subscribe(data => {
      console.log('Updated order is: ', data);
    })
    this.router.navigate(['table']);
  }

  goBackToPaymentPage() {
    this.location.back();
  }
}
