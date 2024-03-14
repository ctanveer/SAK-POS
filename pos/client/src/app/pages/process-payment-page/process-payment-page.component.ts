import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUser } from '../../models/user.model';
import { IPaymentLog } from '../../models/paymentlog.model';
import { PaymentlogService } from '../../services/paymentlog.service';
import { OrderService } from '../../services/order.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IOrder } from '../../models/order.model';
import { EmailService } from '../../services/email.service';
import { environment } from '../../../environments/environment.development';
import { PaymentService } from '../../services/payment.service';
import { Stripe } from '@stripe/stripe-js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  fullOrder: IOrder | null = null;
  isEmailModalVisible: boolean = false;
  email: string | null = null;

  completeStatus: boolean = false;
  isBillComplete: boolean = false;

  stripe: Stripe | null = null;
  clientSecret: any;

  ok: boolean = false;

  constructor (private router: Router, 
    private location: Location, 
    private paymentLogService: PaymentlogService, 
    private orderService: OrderService,
    private emailService: EmailService,
  ) {}
  
  ngOnInit(): void {
    const state = this.location.getState() as {billArr: IPaymentLog[], bill: number, user: IUser}
    if (!state || !state.billArr || !state.bill || !state.user) this.router.navigate(['payment']);
    else {
      this.billArr = state.billArr;
      this.totalBillWithTip = state.bill;
      this.user = state.user;
      this.orderId = state.billArr[0].orderId;
    }

    this.invokeStripe();

  }

  paymentHandler: any = null;
  published_key = environment.STRIPE_KEY;

  makePayment(index: number) {
    this.currentIndex = index;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.published_key,
      locale: 'auto',
      token: (stripeToken: any) => {
        this.handleOk();
      },
    });
    
    paymentHandler.open({
      name: 'Bento-POS',
      description: 'Order Payment',
      amount: Number(this.billArr[this.currentIndex].totalBill) * 100,
      currency: 'GBP'
    });
    
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.published_key,
          locale: 'auto',
          token: function (stripeToken: any) {
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  changePmtMode(index: number, value: string) {
    this.billArr[index].pmtMode = value;
  }

  completePayment(index: number) {
    this.currentIndex = index;
    if (this.billArr[this.currentIndex].pmtMode === 'cash') {
      this.isCashPayVisible = true;
    }
    else if (this.billArr[this.currentIndex].pmtMode === 'card') {
      this.isCardPayVisible = true;
    } 

  }
  
  handleCancel() {
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
    })
  }

  handleOk() {
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
      this.fullOrder = data;

      this.isEmailModalVisible = true;
    })
  }


  handleEmailOk() {
    if (this.email && this.isValidEmail(this.email)) {
      this.isEmailModalVisible = false;
      if (this.fullOrder) {
        this.isBillComplete = true;
        this.emailService.sendEmail(this.email, this.fullOrder, this.totalBillWithTip).subscribe(data =>  {
          console.log('Successdully sent mail: ', data);
          this.isBillComplete = false;
          this.router.navigate(['table']);
        })
      }
    } else {
      console.error('Invalid email address');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleEmailCancel() {
    this.isEmailModalVisible = false;
  }

  goBackToPaymentPage() {
    this.location.back();
  }
}