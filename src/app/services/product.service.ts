import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, catchError, map, throwError } from 'rxjs';

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';

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
}
