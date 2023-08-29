import { Product } from './product';

describe('Product', () => {
  it('should create a new product instance', () => {
    const sku = 'SKU123';
    const name = 'Test Product';
    const description = 'This is a test product';
    const unitPrice = 10.99;
    const imageUrl = 'https://example.com/image.jpg';
    const active = true;
    const unitsInStock = 50;
    const dateCreated = new Date('2023-08-28');
    const lastUpdated = new Date('2023-08-28');

    const product = new Product(
      sku,
      name,
      description,
      unitPrice,
      imageUrl,
      active,
      unitsInStock,
      dateCreated,
      lastUpdated
    );

    expect(product.sku).toBe(sku);
    expect(product.name).toBe(name);
    expect(product.description).toBe(description);
    expect(product.unitPrice).toBe(unitPrice);
    expect(product.imageUrl).toBe(imageUrl);
    expect(product.active).toBe(active);
    expect(product.unitsInStock).toBe(unitsInStock);
    expect(product.dateCreated).toBe(dateCreated);
    expect(product.lastUpdated).toBe(lastUpdated);
  });
});
