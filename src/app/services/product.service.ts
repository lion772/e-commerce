import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import {Observable, catchError, map, throwError, of, Subscription} from 'rxjs';
import { ProductCategory } from '../common/product-category';

interface GetResponse {
  _embedded: {
    products: Product[];
  };
  page: Pagination

}
interface GetResponseCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

interface Pagination {
  size: number,
  totalElements: number,
  totalPages	: number,
  number: number,
}

export interface ProductsMetadata {
  products: Product[],
  page: Pagination
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';
  private baseUrlCategory = 'http://localhost:8080/product-category';

  constructor(private http: HttpClient) {}

  getProductListById(categoryId: string = '1', page = 1, size = 10): Observable<ProductsMetadata> {
    //const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${size}`;
    return this.getProducts(searchUrl);
  }

  getProductListByQuery(q: string): Observable<ProductsMetadata> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${q}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<ProductsMetadata> {
    return this.http.get<GetResponse>(searchUrl).pipe(
      map(({_embedded, page}) => {
        return {products: _embedded.products, page}
      }),
      catchError((error) => {
        console.error('Error fetching product list:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<GetResponseCategory>(this.baseUrlCategory).pipe(
      map(({ _embedded }) => _embedded.productCategory),
      catchError((error) => {
        console.error('Error fetching product category list:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  getProductById(productId: string ): Observable<Product | null>  {
    return this.http.get<Product>(this.baseUrl + '/' + productId).pipe(
      catchError((error) => {
        console.error('Error fetching product list:', error);
        return of(null);
      })
    );
  }
}
