import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../common/product';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should retrieve product list', () => {
    const mockData: Product[] = [
      {
        sku: 'BOOK-TECH-1000',

        name: 'JavaScript - The Fun Parts',

        description: 'Learn JavaScript',

        unitPrice: 19.99,

        imageUrl: 'assets/images/products/placeholder.png',

        active: true,

        unitsInStock: 100,

        dateCreated: new Date('2023-08-25'),

        lastUpdated: new Date('2023-08-27'),
      },
    ];
    const mockProducts: Product[] = mockData;

    productService.retrieveProductList().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:8080/products'
    );
    expect(req.request.method).toBe('GET');

    req.flush({
      _embedded: {
        products: mockProducts,
      },
    });
  });
});
