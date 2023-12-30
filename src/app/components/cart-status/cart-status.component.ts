import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  public cartItems: CartItem[] = [];
  public totalCartPrice: number = 0;
  public totalQuantity: number = 0;

  public constructor(public cartService: CartService) {
  }

  public ngOnInit() {
    this.cartService.cartItem$.subscribe((currentItem: CartItem | null) => this.handleCartItems(currentItem));

    this.calculateTotalCartPrice();
    this.calculateTotalQuantity();
  }

  private handleCartItems(currentItem: CartItem | null) {
    if (!currentItem) {
      return;
    }
    const existingCartItem = this.cartItems.find(item => item.id === currentItem.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push({...currentItem, quantity: 1});
    }
    this.calculateTotalCartPrice();
    this.calculateTotalQuantity();
  }

  private calculateTotalCartPrice() {
    const total = this.cartItems.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
    this.totalCartPrice = parseFloat(total.toFixed(2));
  }

  private calculateTotalQuantity(): void {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

}
