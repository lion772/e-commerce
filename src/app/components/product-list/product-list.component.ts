import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private categoryId: string = '1';

  public constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });
    this.fetchProducts();
  }

  private fetchProducts() {
    this.productList$ = this.productService.retrieveProductList(
      this.categoryId
    );
  }
}
