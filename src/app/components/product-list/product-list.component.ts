import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from 'src/app/common/product';
import {ProductService, ProductsMetadata} from 'src/app/services/product.service';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public productList$!: Observable<ProductsMetadata>;
  public products: Product[] = [];
  private query: string = '';
  private previousQuery: string = '-';
  private curCategoryId: string = '1';
  private prevCategoryId: string = '1';
  public currentPage: number = 1;
  public pageSize: number = 5;
  public totalElements: number = 100;
  public totalPages: number = 10;

  public constructor(
    public productService: ProductService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.curCategoryId = params['id'];
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
    if (this.prevCategoryId !== this.curCategoryId || this.previousQuery !== this.query) {
      this.currentPage = 1;
    }
    this.prevCategoryId = this.curCategoryId;

    if (this.query.trim().length === 0) {
      this.productService.getProductListById(
        this.curCategoryId,
        this.currentPage - 1,
        this.pageSize
      ).subscribe((data: ProductsMetadata) => {
        this.handleProductsMetadata(data);
      })
    } else {
      this.previousQuery = this.query;
      this.productService.getProductListByQuery(
        this.currentPage - 1,
        this.pageSize,
        this.query
      )
        .subscribe((data: ProductsMetadata) => {
          this.handleProductsMetadata(data);
        })

    }
  }

  private handleProductsMetadata(data: ProductsMetadata) {
    this.products = data.products;
    this.mapToMetadataPagination(data);
  }

  private mapToMetadataPagination(data: ProductsMetadata) {
    const {number, size, totalElements, totalPages} = data.page;
    this.currentPage = number + 1; // Angular bootstrap pagination is 1-based
    this.pageSize = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }

  public onClickProduct(productId: number) {
    this.router.navigateByUrl(`/products/${productId}`);
  }

  public onPageHasChanged(clickedPage: number) {
    this.currentPage = clickedPage;
    this.fetchProducts(); //fetch new list of products with the given clicked page
  }

  public updatePageSize(pageSelectValue: string) {
    this.pageSize = +pageSelectValue;
    this.currentPage = 1;
    this.fetchProducts();
  }
}
