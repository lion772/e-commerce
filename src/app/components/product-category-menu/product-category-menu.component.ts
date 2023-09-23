import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  public productCategories$!: Observable<ProductCategory[]>;

  public constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productCategories$ = this.productService.getProductCategories();
  }
}
