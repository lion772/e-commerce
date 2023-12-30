export class CartItem {
  public constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public unitPrice: number,
    public quantity: number
  ) {
  }
}
