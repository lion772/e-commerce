import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';

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

  public retrieveProductList(): Observable<Product[]> {
    return this.http
      .get<GetResponse>(this.baseUrl)
      .pipe(map(({ _embedded }) => _embedded.products));
  }
}
