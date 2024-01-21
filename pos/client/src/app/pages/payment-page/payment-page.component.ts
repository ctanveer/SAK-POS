import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IItem } from '../../models/item-interfaces/item.model';
import { IBill } from '../../models/bill.model';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {
  
  user : IUser | undefined;
  orderId: string = '';
  bill: number = 1;
  orderCart: IItem[] | undefined;
  billCart: number[] | undefined;
  isSplitModalVisible: boolean = false;
  numberOfSplits: number = 1;
  splitBillArr: IBill[] = [];

  isTipModalVisible: boolean = false;
  tipValue: number | null = null;

  isTipAdded: boolean = false;
  isTipAndSplitAdded: boolean = false;

  discountValue: number | null = null;

  
  constructor ( private auth: AuthApiService, private router: Router, private location: Location){}
  
  ngOnInit(): void {
    this.auth.getUser().subscribe(data => this.user = data.user);
    const state = this.location.getState() as {orderId: string, bill: string, orderCart: IItem[]} | undefined;
    if (!state || !state.orderId || !state.bill || !state.orderCart) this.router.navigate(['order']);
    else {
      console.log('The current state is: ', state);
      this.orderId = state.orderId;
      this.bill = parseFloat(state.bill);
      this.orderCart = state.orderCart;
      console.log('The stuff are: ', this.orderId, this.bill, this.orderCart);
    }
    this.splitBillArr.push({
      orderId: this.orderId,
      splitId: 1,
      total: this.bill,
      paid: false,
      pmtMode: null
    })

  } 

  voidPayment() {
    alert('Payment voided!');
  }

  showSplitModal() {
    this.isSplitModalVisible = true;
  }

  handleSplitModalOk(): void {
    console.log('Button ok clicked!');
    
    if (this.numberOfSplits > 1) {
      this.splitBillArr = [];
      for (let i=0; i < this.numberOfSplits; i++) {
        this.splitBillArr.push({
          orderId: this.orderId,
          splitId: i + 1,
          total: parseFloat((this.bill/this.numberOfSplits).toFixed(2)),
          paid: false,
          pmtMode: null
        });
      }
    }
    this.isSplitModalVisible = false;
    this.isTipAndSplitAdded = true;
  }

  handleSplitModalCancel(): void {
    console.log('Button cancel clicked!');
    this.isSplitModalVisible = false;
  }

  showAddTipModal() {
    this.isTipModalVisible = true;
  }

  handleTipModalCancel() {
    console.log('Button cancel clicked!');
    this.isTipModalVisible = false;
  }

  handleTipModalOk() {
    console.log('Tip is: ', typeof(this.tipValue));
    // const tip = this.tipValue;
    // console.log(typeof tip);
    console.log('Bill before: ', this.bill);
    if(this.bill && this.tipValue) this.bill = this.bill + this.tipValue;
    console.log('Bill after: ', this.bill);
    this.isTipModalVisible = false;
    this.isTipAdded = true;
  }

  finalizePayment() {
    this.router.navigateByUrl('/process-pmt', {
      state: {
        billArr: this.splitBillArr,
        bill: this.bill,
        user: this.user
      }
    })
  }
}
