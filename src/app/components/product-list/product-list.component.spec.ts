import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'retrieveProductList',
    ]);

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve product list from ProductService', () => {
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
    mockProductService.getProductListById.and.returnValue(of(mockProducts));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.productList$).toBeDefined();
    component.productList$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    //should retrieve product list on initialization
    expect(mockProductService.getProductListById).toHaveBeenCalled();
    expect(component.productList$).toBeInstanceOf(Observable);
  });
});
