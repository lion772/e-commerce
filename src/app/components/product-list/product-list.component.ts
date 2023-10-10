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
  public currentPage: number = 0; // Current page
  public size: number	= 5; // Items per page
  public totalElements: number = 100; // Total number of items
  public totalPages: number =	10; // Total number of pages

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
    this.currentPage = number + 1;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }

  public onClickProduct(productId: number) {
    this.router.navigateByUrl(`/products/${productId}`);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onPageChange(this.currentPage);
    }
  }

  public onPageChange(event: any) {
    // Handle page change event
    this.currentPage = event.target ? +event.target.text: event ;
    this.currentPage--;

    // You can load data for the new page here
    this.fetchProducts(); //fetch new list of products with the given clicked page
    this.products = this.getItemsForPage();
  }

  public getItemsForPage(): Product[] {
    // Implement logic to retrieve or filter items based on the current page and size values.
    const startIndex = (this.currentPage - 1) * this.size;
    const endIndex = startIndex + this.size;
    return this.products.slice(startIndex, endIndex);
  }

}
