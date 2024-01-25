import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';
import { MenuService } from '../../services/menu.service';
import { IMenu } from '../../models/item-interfaces/menu.model';
import { ICategories } from '../../models/item-interfaces/categories.model';
//IItem is output model. Has 3 extra fields -> itemQuantity, optionalNotes and chosenOptions
import { IItem } from '../../models/item-interfaces/item.model';
import { IOption } from '../../models/item-interfaces/option.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { ToastMessageService } from '../../services/toast-message/toast-message.service';
import { PaymentlogService } from '../../services/paymentlog.service';
import { IPaymentLog } from '../../models/paymentlog.model';
import { IOrder } from '../../models/order.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit {
  
  constructor ( private auth: AuthApiService, private menuService: MenuService, private router: Router, private location: Location, private orderService: OrderService, private toast: ToastMessageService, private paymentLogService: PaymentlogService) {}
  
  user : IUser | undefined;
  // menuList : IMenu | undefined;
  menuList : IItem[] | undefined;
  categories: ICategories[] = [];
  timeOfDays: string[] = [];
  selectedTimeTab: string = '';
  selectedCategory: ICategories | null = null;
  filteredMenu: IItem[] | undefined;
  filteredCategories: ICategories[] | undefined;
  
  orderState: string = "new";
  
  orderCart: IItem[] = [];
  totalBill: string = '';
  selectedCartItem: IItem | null = null;
  editorVisible: boolean = false;
  
  selectedOption: string | null = null;
  optionalNotes: string | null = null;
  
  orderId : string = '';
  tableId: string = '';
  tableName: string = '';
  orderStatus: string = '';

  ngOnInit(): void {
    const state = this.location.getState() as { orderId: string, tableId: string, tableName: string, orderStatus: string, order: { items: IItem[] } | null, status: 'update' | 'new' } | undefined;
    if (!state || !state.orderId || !state.tableId || !state.tableName || !state.orderStatus) this.router.navigate(['table']);
    else {
      console.log(state)
      this.orderId = state.orderId;
      this.tableId = state.tableId;
      this.orderStatus = state.orderStatus;
      this.tableName = state.tableName;


      console.log('Full Order is: ', state.order);
      if (state.order) {
        this.orderCart = [...state.order.items];
      }
      this.orderState = state.status;
    }

    this.auth.getUser().subscribe(data => this.user = data.user);
    
    this.menuService.getCategories().subscribe(data => {
      this.categories = data;
      console.log('Categories are: ', this.categories);
    })
    
    this.menuService.getMenu().subscribe(data => {
      this.menuList = data;
      this.getTimeOfDays();
      console.log('Restaurant Menu is: ', this.menuList);
    });
  }


  getTimeOfDays() {
    let tempArr = []
    if (this.menuList) {
      for (const element of this.menuList) {
        let timeList = element.item.timeOfDay;
        for (const item of timeList) {
          tempArr.push(item);
        }
      }
    }
    this.timeOfDays = [...new Set(tempArr)];
  }

  //Activate the below when item.isDisabled field is provided by Skeleton
  /*
  setFilteredMenu() {
    if (this.menuList) {
      this.filteredMenu = this.menuList.filter(item => {
        return (item.categoryId === this.selectedCategory?._id) && !item.item.isDisabled})
        .filter(item => item.item.timeOfDay.includes(this.selectedTimeTab));
    }
  }
  */

  setFilteredMenu() {
    if (this.menuList) {
      this.filteredMenu = this.menuList.filter(item => {
        return item.categoryId === this.selectedCategory?._id})
        .filter(item => item.item.timeOfDay.includes(this.selectedTimeTab));
    }
  }

  filterCategoriesForTimeTab() {
    this.filteredCategories = [];
    let tempArr:ICategories[] = [];
    if (this.menuList) {
      for (const category of this.categories) {
        for (const menuItem of this.menuList) {
          if (menuItem.categoryId === category._id && menuItem.item.timeOfDay.includes(this.selectedTimeTab)) {
            tempArr.push(category);
          }
        }
      }
      this.filteredCategories = [...new Set(tempArr)];
    }

  }

  handleTimeTabChange(index: number) {
    this.selectedTimeTab = this.timeOfDays[index];  
    this.filterCategoriesForTimeTab();
    // this.selectedCategory = this.categories[0];
    if (this.filteredCategories) this.selectedCategory = this.filteredCategories[0];
    this.setFilteredMenu();
  }

  handleCategoryTabChange(index: number) {
    this.selectedCategory = this.categories[index];
    this.setFilteredMenu();
  }

  getOrderStatusColor() {
    switch (this.orderStatus) {
      case 'pending':
          return '#3b5999';
      case 'preparing':
          return '#f50';
      case 'ready':
          return '#87d068';
      case 'served':
          return '#108ee9';
      case 'complete':
          return 'black';      
      default:
          return 'black';
    } 
  }

  addToCart(item: IItem) {
    console.log('Item is: ', item)
    const copy : IItem = JSON.parse(JSON.stringify(item));
    copy.item.itemQuantity = 1;
    copy.item.optionalNotes = '';
    this.orderCart.push(copy);
  }

  removeItemFromCart(item: IItem) {
    let index = this.orderCart.findIndex(cartItem => cartItem === item);
    if (index !== -1) {
      this.orderCart.splice(index, 1);
    }
  }

  editCartItem(item: IItem) {
    this.selectedCartItem = item;
    if(this.selectedCartItem) this.editorVisible = true;
  }

  closeEditor() {
    this.editorVisible = false;
    this.selectedCartItem = null;
    this.selectedOption = null;
    this.optionalNotes = null;
  }
  
  cancelEdit() {
    //NEEDS TO BE WORKED ON
  }

  selectAddNoOtion(option: string) {
    if (option === 'Add') this.selectedOption = 'Add';
    else if (option === 'No') this.selectedOption = 'No';
    else this.selectedOption = null;
  }

  insertToAddOption(option: IOption) {
    if (!this.selectedCartItem) return;

    if (this.selectedCartItem.item.chosenOptions) {
      if (!this.isAddOptionSelected(option))
        this.selectedCartItem.item.chosenOptions.add.push(option);
      else 
        this.selectedCartItem.item.chosenOptions.add = this.selectedCartItem.item.chosenOptions.add.filter(item => item._id !== option._id);
    } else {
      this.selectedCartItem.item.chosenOptions = {add: [option], no: []}
    }
  }

  insertToNoOption(option: IOption) {
    if (!this.selectedCartItem) return;

    if (this.selectedCartItem.item.chosenOptions) {
      if (!this.isNoOptionSelected(option))
        this.selectedCartItem.item.chosenOptions.no.push(option);
      else 
        this.selectedCartItem.item.chosenOptions.no = this.selectedCartItem.item.chosenOptions.no.filter(item => item._id !== option._id);
    } else {
      this.selectedCartItem.item.chosenOptions = {add: [], no: [option]}
    }
  }

  insertOptionalNotes() {
    if (!this.selectedCartItem) return;
    if (this.optionalNotes) {
      this.selectedCartItem.item.optionalNotes = this.optionalNotes;
    }
  }
  

  updateOrderStatus() {
    this.orderService.updateOrderStatus(this.orderId, 'served').subscribe(data => {
      console.log('Order with updated status is: ', data);
      this.toast.setMessage('Order Served', 'info');
      this.orderStatus = 'served';
    })
  }

  //need to add tag to identify items which are already sent
  confirmAndSendOrder() {

    console.log('NEW ORDER IS: ', this.orderCart);
    console.log('Order Id is: ', this.orderId);
    this.orderService.updateOrderItems(this.orderId, this.orderCart).subscribe(data => {
      console.log('Posted Order is:', data);
      this.toast.setMessage('Order sent.', 'success');
      this.router.navigateByUrl('/tables');
    })
  }

  calculateTotal() {
    this.totalBill = this.orderCart.reduce((total, cartItem) => {
      const basePrice = cartItem.item.itemPrice;
      const addOptionPrice = cartItem.item.chosenOptions ? cartItem.item.chosenOptions.add.reduce((total, option) => ((option.quantity * option.costPerUnit) + total), 0) : 0;
      const noOptionPrice = cartItem.item.chosenOptions ? cartItem.item.chosenOptions.no.reduce((total, option) => ((option.quantity * option.costPerUnit) + total), 0) : 0;

      return total + ((basePrice + addOptionPrice - noOptionPrice) * (cartItem.item.itemQuantity ? cartItem.item.itemQuantity : 1));
    }, 0).toFixed(2);
    return this.totalBill;
  }

  getTimeOutDayIndex () {
    return this.categories.findIndex(item => item._id === this.selectedCategory?._id)
  }

  isAddOptionSelected (option: IOption) {
    if (!this.selectedCartItem) return false;
    if (!this.selectedCartItem.item.chosenOptions) return false;
    return this.selectedCartItem.item.chosenOptions.add.findIndex(item => item._id === option._id) !== -1;
  }

  isNoOptionSelected (option: IOption) {
    if (!this.selectedCartItem) return false;
    if (!this.selectedCartItem.item.chosenOptions) return false;
    return this.selectedCartItem.item.chosenOptions.no.findIndex(item => item._id === option._id) !== -1;
  }

  calculateSelectedItemPrice() {
    if (!this.selectedCartItem) return 0;
    const basePrice = this.selectedCartItem.item.itemPrice;
      const addOptionPrice = this.selectedCartItem.item.chosenOptions ? this.selectedCartItem.item.chosenOptions.add.reduce((total, option) => ((option.quantity * option.costPerUnit) + total), 0) : 0;
      const noOptionPrice = this.selectedCartItem.item.chosenOptions ? this.selectedCartItem.item.chosenOptions.no.reduce((total, option) => ((option.quantity * option.costPerUnit) + total), 0) : 0;
      return ((basePrice + addOptionPrice - noOptionPrice) * (this.selectedCartItem.item.itemQuantity ? this.selectedCartItem.item.itemQuantity : 1)).toFixed(2);
  }

  navigateToPayment(pmtLogArr: IPaymentLog[]) {
    this.router.navigateByUrl('/payment', {
      state: {
        pmtLogArr: pmtLogArr,
        bill: this.totalBill, 
        orderCart: this.orderCart,
      }
    })
  }

  proceedToPayment() {
    console.log('Order cart is: ', this.orderCart);
    let pmtLogArr: IPaymentLog[] = [];
    this.paymentLogService.getPaymentLogsByOrderId(this.orderId).subscribe(data => {
      pmtLogArr = data;
      console.log('Pmt log is:', pmtLogArr);
      if (pmtLogArr?.length === 0) {
        this.paymentLogService.createPaymentLog({
          orderId: this.orderId,
          totalBill: this.totalBill, 
        }).subscribe(data => {
          pmtLogArr.push(data);
          this.navigateToPayment(pmtLogArr);
        })
      } 
      else {
        this.navigateToPayment(pmtLogArr);
      }
    })
  }

  goBackToTablePage() {
    this.location.back();
  }

}