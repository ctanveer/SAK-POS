import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../../models/menuitem.model';
import { AuthApiService } from '../../services/auth-api/auth-api.service';
import { IUser } from '../../models/user.model';
import { MenuService } from '../../services/menu.service';
import { IMenu } from '../../models/item-interfaces/posInput/menu.model';
import { ICategories } from '../../models/item-interfaces/categories.model';
import { IItem } from '../../models/item-interfaces/posInput/item.model';

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

  constructor ( private auth: AuthApiService, private menu: MenuService) {}

  user : IUser | undefined;
  menuList : IMenu | undefined;
  categories: ICategories[] | undefined;
  timeOfDays: string[] = [];

  orderCart: IItem[] = [];


  ngOnInit(): void {
    this.auth.getUser().subscribe(data => this.user = data.user);
    this.menuList = this.menu.getMenu();
    console.log('Menu:', this.menuList);
    this.categories = this.menuList.categories;
    console.log('Categories', this.categories);
    this.getTimeOfDays();
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

  addToCart(item: IItem) {
    console.log(item);
    this.orderCart.push(item);
  }

  //need to add tag to identify items which are already sent
  confirmOrder() {
    console.log('order sent');
  }

  calculateTotal() {
    return this.orderCart.reduce((total, item) => total + item.item.itemPrice, 0);
  }
}