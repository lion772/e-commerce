import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import {Observable, catchError, map, throwError, of} from 'rxjs';
import { ProductCategory } from '../common/product-category';

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
interface GetResponseCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';
  private baseUrlCategory = 'http://localhost:8080/product-category';

  constructor(private http: HttpClient) {}

  retrieveProductList(categoryId: string = '1'): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.http.get<GetResponse>(searchUrl).pipe(
      map(({ _embedded }) => _embedded.products),
      catchError((error) => {
        console.error('Error fetching product list:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  getProductListByQuery(q: string): Observable<Product[]> {
    console.log(q);
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${q}`;
    return this.http.get<GetResponse>(searchUrl).pipe(
      map(({ _embedded }) => {
        console.log(_embedded.products)
        return _embedded.products
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
}
