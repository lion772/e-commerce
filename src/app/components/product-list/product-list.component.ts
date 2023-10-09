import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from 'src/app/common/product';
import {ProductService} from 'src/app/services/product.service';
import {SearchService} from "../../services/search.service";
import {query} from "@angular/animations";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public productList$!: Observable<Product[]>;
  private query: string = '';
  private categoryId: string = '1';

  public constructor(
    public productService: ProductService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.fetchProducts();
    });
    this.searchService.searchQuery$.subscribe({
      next: (q: string) => {
        this.query = q;
        this.fetchProducts()
      },
    })
  }

  private fetchProducts() {
    if (this.query.trim().length === 0) {
      this.productList$ = this.productService.getProductListById(
        this.categoryId
      );
    } else {
      this.productList$ = this.productService.getProductListByQuery(
        this.query
      );
    }
  }

  public onClickProduct(productId: number) {
    this.router.navigateByUrl(`/products/${productId}`);
  }

}
