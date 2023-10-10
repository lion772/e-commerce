import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  public selectedProduct$!: Observable< Product | null>;
  public isLoading: boolean = true;
  public productNotFound: boolean = false;
  public constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.selectedProduct$ = this.productService.getProductById(productId) as Observable<Product | null>;
      this.selectedProduct$.subscribe(
        (product) => {
          if (product === null) {
            this.productNotFound = true; // Set the flag to true when no product is found
          }
          this.isLoading = false;
        },
        (error) => {
          this.productNotFound = true; // Set the flag to true on error
          this.isLoading = false;
        }
      );
    });

  }

  public onAddToCart(id: number) {
    //TODO: write logic to add product to cart
    return;
  }
}
