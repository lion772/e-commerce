import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public productList$!: Observable<Product[]>;
  public constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productList$ = this.productService.retrieveProductList();
  }
}