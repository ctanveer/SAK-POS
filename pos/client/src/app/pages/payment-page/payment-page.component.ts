import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IItem } from '../../models/item-interfaces/item.model';
import { IBill } from '../../models/bill.model';
import { IPaymentLog } from '../../models/paymentlog.model';
import { PaymentlogService } from '../../services/paymentlog.service';

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
  // billCart: number[] | undefined;
  isSplitModalVisible: boolean = false;
  numberOfSplits: number = 1;
  // splitBillArr: IBill[] = [];
  splitBillArr: IPaymentLog[] = [];

  isTipModalVisible: boolean = false;
  tipValue: number | null = null;

  isTipAdded: boolean = false;
  isTipAndSplitAdded: boolean = false;

  discountValue: number | null = null;

  
  constructor ( private auth: AuthApiService, private router: Router, private location: Location, private paymentLogService: PaymentlogService){}
  
  ngOnInit(): void {
    this.auth.getUser().subscribe(data => this.user = data.user);
    
    const state = this.location.getState() as {pmtLogArr: IPaymentLog[], bill: string, orderCart: IItem[]} | undefined;
    if (!state || !state.pmtLogArr || !state.bill || !state.orderCart) this.router.navigate(['order']);
    
    
    // const state = this.location.getState() as {orderId: string, bill: string, orderCart: IItem[]} | undefined;
    // if (!state || !state.orderId || !state.bill || !state.orderCart) this.router.navigate(['order']);
    
    else {
      console.log('The current state is: ', state);
      this.splitBillArr = state.pmtLogArr;
      this.orderId = state.pmtLogArr[0].orderId;
      this.bill = parseFloat(state.bill);
      this.orderCart = state.orderCart;
      this.numberOfSplits = state.pmtLogArr.length;
      console.log('The stuff are: ', this.orderId, this.bill, this.orderCart);
    }
    // this.splitBillArr.push({
    //   orderId: this.orderId,
    //   splitId: 1,
    //   total: this.bill,
    //   paid: false,
    //   pmtMode: null
    // })

  } 

  voidPayment() {
    alert('Payment voided!');
  }

  showSplitModal() {
    this.isSplitModalVisible = true;
  }

  handleSplitModalOk(): void {
    console.log('Button ok clicked!');

    
    if (this.numberOfSplits > this.splitBillArr.length) {
      for (let i = 0; i < this.numberOfSplits - this.splitBillArr.length; i++) {
        this.paymentLogService.createPaymentLog({
          orderId: this.orderId,
          totalBill: (this.bill / this.numberOfSplits).toString()
        }).subscribe(data => {
          this.splitBillArr.push(data);
          for (let j = 0; j < this.splitBillArr.length; j++) {
            this.splitBillArr[j].totalBill = ((this.bill / this.numberOfSplits).toFixed(2)).toString()
            this.paymentLogService.updatePaymentLogById(this.splitBillArr[j]).subscribe()
          }
        })
      }
    } 

    // else {
    //   for (let j = 0; j < this.splitBillArr.length; j++) {
    //     this.splitBillArr[j].totalBill = ((this.bill / this.numberOfSplits).toFixed(2)).toString()
    //     this.paymentLogService.updatePaymentLogById(this.splitBillArr[j]).subscribe()
    //   }
    // }




    // if (this.numberOfSplits > 1) {
    //   this.splitBillArr = [];
    //   for (let i=0; i < this.numberOfSplits; i++) {
    //     this.splitBillArr.push({
    //       orderId: this.orderId,
    //       splitId: i + 1,
    //       total: parseFloat((this.bill/this.numberOfSplits).toFixed(2)),
    //       paid: false,
    //       pmtMode: null
    //     });
    //   }
    // }
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
