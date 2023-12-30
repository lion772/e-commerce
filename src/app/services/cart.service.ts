import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CartItem} from "../common/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemSub = new BehaviorSubject<CartItem | null>(null);
  public readonly cartItem$ = this.cartItemSub.asObservable();

  constructor() {
  }

  public setNewCartItem(cartItem: CartItem) {
    this.cartItemSub.next(cartItem);
  }
}
