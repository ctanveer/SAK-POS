import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../../models/menuitem.model';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';
import { MenuService } from '../../services/menu.service';
import { IMenu } from '../../models/item-interfaces/posInput/menu.model';
import { ICategories } from '../../models/item-interfaces/categories.model';
//IItem is output model. Has 3 extra fields -> itemQuantity, optionalNotes and chosenOptions
import { IItem } from '../../models/item-interfaces/posOutput/item.model';
import { IAddOption } from '../../models/item-interfaces/addOption.model';
import { INoOption } from '../../models/item-interfaces/noOption.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IOrderListInterface } from '../../models/item-interfaces/posOutput/orderList.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit {
  
  menuItems: IMenuItem[] = [
    { itemId: 1, name: 'Beef Burger', price: 5.00, description: "the burger here", image: '../../../assets/item-images/burger-1.jpg' },
    { itemId: 2, name: 'Pepperoni Pizza', price: 7.50, description: "the pizza here", image: '../../../assets/item-images/pizza-1.jpg' },
    { itemId: 3, name: 'Chicken Pasta', price: 6.20, description: "the pasta here", image: '../../../assets/item-images/pasta-1.jpg' }
  ];

  constructor ( private auth: AuthApiService, private menuService: MenuService, private router: Router, private location: Location, private orderService: OrderService) {}

  user : IUser | undefined;
  menuList : IMenu | undefined;
  categories: ICategories[] = [];
  timeOfDays: string[] = [];
  selectedTimeTab: string = '';
  selectedCategory: ICategories | null = null;
  filteredMenu: IItem[] | undefined;

  orderCart: IItem[] = [];
  selectedCartItem: IItem | null = null;
  editorVisible: boolean = false;

  selectedOption: string | null = null;
  optionalNotes: string | null = null;

  orderId : string = '';
  tableId: string = '';


  ngOnInit(): void {
    const state = this.location.getState() as { orderId: string, tableId: string } | undefined;
    if (!state || !state.orderId || !state.tableId) this.router.navigate(['table']);
    else {
      
      this.orderId = state.orderId;
      this.tableId = state.tableId;
      
      console.log(this.orderId);
      console.log(this.tableId);
      
    }

    console.log(this.orderId);
    console.log(this.tableId);

    this.auth.getUser().subscribe(data => this.user = data.user);
    this.menuList = this.menuService.getMenu();
    this.getTimeOfDays();
    this.categories = this.menuList.categories;
    
    console.log('Menu:', this.menuList);
    console.log('Categories', this.categories);
    console.log('Time of Days are: ', this.timeOfDays);
    console.log('item name is: ', this.menuList.items[0].item.itemName);
    
  }

  getTimeOfDays() {
    let tempArr = []
    if (this.menuList) {
      for (let i = 0; i < this.menuList.items.length; i++) {
        let timeList = this.menuList.items[i].item.timeOfDay;
        for (let j = 0; j < timeList.length; j++) {
          tempArr.push(timeList[j])
        }
      }
    }
    this.timeOfDays = [...new Set(tempArr)];
  }

  setFilteredMenu() {
    this.filteredMenu = this.menuList?.items.filter(item => {
      return (item.categoryId === this.selectedCategory?.id) && !item.item.isDisabled})
      .filter(item => item.item.timeOfDay.includes(this.selectedTimeTab));
  }

  handleTimeTabChange(index: number) {
    this.selectedTimeTab = this.timeOfDays[index];
    this.selectedCategory = this.categories[0];
    this.setFilteredMenu();
  }

  handleCategoryTabChange(index: number) {
    this.selectedCategory = this.categories[index];
    this.setFilteredMenu();
  }

  addToCart(item: IItem) {
    const copy : IItem = JSON.parse(JSON.stringify(item));
    copy.item.itemQuantity = 1;
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

  insertToAddOption(option: IAddOption) {
    if (!this.selectedCartItem) return;

    if (this.selectedCartItem.item.chosenOptions) {
      if (!this.isAddOptionSelected(option))
        this.selectedCartItem.item.chosenOptions.add.push(option);
      else 
        this.selectedCartItem.item.chosenOptions.add = this.selectedCartItem.item.chosenOptions.add.filter(item => item.ingredient.id !== option.ingredient.id);
    } else {
      this.selectedCartItem.item.chosenOptions = {add: [option], no: []}
    }
  }

  insertToNoOption(option: INoOption) {
    if (!this.selectedCartItem) return;

    if (this.selectedCartItem.item.chosenOptions) {
      if (!this.isNoOptionSelected(option))
        this.selectedCartItem.item.chosenOptions.no.push(option);
      else 
        this.selectedCartItem.item.chosenOptions.no = this.selectedCartItem.item.chosenOptions.no.filter(item => item.ingredient.id !== option.ingredient.id);
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
 
  //need to add tag to identify items which are already sent
  confirmAndSendOrder() {
    let newOrder:IOrderListInterface = {
      orderId: this.orderId,
      categories: this.categories,
      orderTime: Date.now(),
      orderType: 'in-house',
      vipCustomer: false,
      tableId: this.tableId,
      items: this.orderCart
    }
    //work pending here
    console.log('NEW ORDER IS: ', newOrder);
    this.orderService.createOrder(newOrder).subscribe(order => console.log('Posted Order is:', order));
  }

  calculateTotal() {
    return this.orderCart.reduce((total, cartItem) => {
      const basePrice = cartItem.item.itemPrice;
      const addOptionPrice = cartItem.item.chosenOptions ? cartItem.item.chosenOptions.add.reduce((total, option) => ((option.quantity * option.ingredient.costPerUnit) + total), 0) : 0;
      const noOptionPrice = cartItem.item.chosenOptions ? cartItem.item.chosenOptions.no.reduce((total, option) => ((option.quantity * option.ingredient.costPerUnit) + total), 0) : 0;

      return total + ((basePrice + addOptionPrice - noOptionPrice) * (cartItem.item.itemQuantity ? cartItem.item.itemQuantity : 1));
    }, 0);
  }

  getTimeOutDayIndex () {
    return this.categories.findIndex(item => item.id === this.selectedCategory?.id)
  }

  isAddOptionSelected (option: IAddOption) {
    if (!this.selectedCartItem) return false;
    if (!this.selectedCartItem.item.chosenOptions) return false;
    return this.selectedCartItem.item.chosenOptions.add.findIndex(item => item.ingredient.id === option.ingredient.id) !== -1;
  }

  isNoOptionSelected (option: IAddOption) {
    if (!this.selectedCartItem) return false;
    if (!this.selectedCartItem.item.chosenOptions) return false;
    return this.selectedCartItem.item.chosenOptions.no.findIndex(item => item.ingredient.id === option.ingredient.id) !== -1;
  }

}