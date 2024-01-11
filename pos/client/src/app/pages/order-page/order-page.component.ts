import { Component } from '@angular/core';
import { IMenuItem } from '../../models/menuitem.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  
  menuItems: IMenuItem[] = [
    { itemId: 1, name: 'Beef Burger', price: 5.00, description: "the burger here", image: '../../../assets/item-images/burger-1.jpg' },
    { itemId: 2, name: 'Pepperoni Pizza', price: 7.50, description: "the pizza here", image: '../../../assets/item-images/pizza-1.jpg' },
    { itemId: 3, name: 'Chicken Pasta', price: 6.20, description: "the pasta here", image: '../../../assets/item-images/pasta-1.jpg' }
  ];

  orderCart: IMenuItem[] = [];

  addToCart(item: IMenuItem) {
    console.log(item);
    this.orderCart.push(item);
  }

  //need to add tag to identify items which are already sent
  sendOrder() {
    console.log('order sent');
  }

  calculateTotal() {
    return this.orderCart.reduce((total, item) => total + item.price, 0);
  }
}