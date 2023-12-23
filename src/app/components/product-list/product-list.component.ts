import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from 'src/app/common/product';
import {ProductService, ProductsMetadata} from 'src/app/services/product.service';
import {SearchService} from "../../services/search.service";
import {query} from "@angular/animations";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public productList$!: Observable<ProductsMetadata>;
  public products: Product[] = [];
  private query: string = '';
  private categoryId: string = '1';
  public currentPage: number = 0;
  public size: number	= 5;
  public totalElements: number = 100;
  public totalPages: number =	10;

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
      this.productService.getProductListById(
        this.categoryId,
        this.currentPage,
        this.size
      ).subscribe((data: ProductsMetadata) => {
        this.handleProductsMetadata(data);
      })
    } else {
      this.productService.getProductListByQuery(
        this.query
      ).subscribe((data: ProductsMetadata) => {
        this.handleProductsMetadata(data);
      })
    }
  }
  private handleProductsMetadata(data: ProductsMetadata) {
    this.products = data.products;
    const {number, size, totalElements, totalPages} = data.page;
    this.currentPage = number + 1; // Angular bootstrap pagination is 1-based
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }

  public onClickProduct(productId: number) {
    this.router.navigateByUrl(`/products/${productId}`);
  }

  public onPageHasChanged(clickedPage: number) {
    this.currentPage = clickedPage;
    this.currentPage--; // Spring boot REST Api is 0-based, hence the current page is decreased by one.
    this.fetchProducts(); //fetch new list of products with the given clicked page
    //TODO: when clicking on back arrow on the browser on the fifth item of the pagination, it goes back to first item
  }


}
