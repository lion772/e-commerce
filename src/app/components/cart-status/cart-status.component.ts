import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent {

  @Output() itemAddedEmitter = new EventEmitter<any>();

  private addToCart() {
    this.itemAddedEmitter.emit("item has been added");
  }

}
