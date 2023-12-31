import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {Observable} from "rxjs";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public product!: Product;
  public isLoading: boolean = true;
  public productNotFound: boolean = false;

  public constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.handleProductDetails(params);
    });
  }

  private handleProductDetails(params: Params) {
    const productId = params['id'];
    this.isLoading = true;
    this.productService.getProductById(productId).subscribe(
      (product) => {
        if (!product) {
          this.productNotFound = true;
        } else {
          this.product = product as Product;
        }
      },
      (error) => {
        this.productNotFound = true;
      },
      () => this.isLoading = false
    );
  }

  public onAddProductToCart(productAdded: Product) {
    const newCartItem = new CartItem(
      productAdded.id,
      productAdded.name,
      productAdded.imageUrl,
      productAdded.unitPrice,
      1
    );
    this.cartService.setNewCartItem(newCartItem);
  }
}
