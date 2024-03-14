import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IItem } from '../../models/item-interfaces/item.model';
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
  isSplitModalVisible: boolean = false;
  numberOfSplits: number = 1;
  splitBillArr: IPaymentLog[] = [];

  isTipModalVisible: boolean = false;
  tipValue: number | null = null;

  isTipAdded: boolean = false;
  isTipAndSplitAdded: boolean = false;

  discountValue: number | null = null;

  
  constructor ( private auth: AuthApiService, private router: Router, private location: Location, private paymentLogService: PaymentlogService) {}
  
  ngOnInit(): void {
    this.auth.getUser().subscribe(data => this.user = data.user);
    
    const state = this.location.getState() as {pmtLogArr: IPaymentLog[], bill: string, orderCart: IItem[]} | undefined;
    if (!state || !state.pmtLogArr || !state.bill || !state.orderCart) this.router.navigate(['order']);
    
    else {
      this.splitBillArr = state.pmtLogArr;
      this.orderId = state.pmtLogArr[0].orderId;
      this.bill = parseFloat(state.bill);
      this.orderCart = state.orderCart;
      this.numberOfSplits = state.pmtLogArr.length;
    }
    
  } 

  showSplitModal() {
    this.isSplitModalVisible = true;
  }

  handleSplitModalOk(): void {
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

    this.isSplitModalVisible = false;
    this.isTipAndSplitAdded = true;
  }

  handleSplitModalCancel(): void {
    this.isSplitModalVisible = false;
  }

  showAddTipModal() {
    this.isTipModalVisible = true;
  }

  handleTipModalCancel() {
    this.isTipModalVisible = false;
  }

  handleTipModalOk() {
    if(this.bill && this.tipValue) this.bill = this.bill + this.tipValue;
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

  goBackToOrderPage() {
    this.location.back();
  }
}
