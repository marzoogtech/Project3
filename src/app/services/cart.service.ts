import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addProduct(product: Product) {
    localStorage.setItem(`${product.id}`, JSON.stringify(product));
    alert(`${product.qty} ${product.name} is/are added to the cart`);
  }

  getCart(): Product[] {
    let products: Product[] = []
    for (let i = 0; i < localStorage.length; i++) {
      products.push(JSON.parse(localStorage.getItem(localStorage.key(i) as string) as string));
    }
    return products
  }

  updateQty(id: number, qty: number) {
    const product: Product = JSON.parse(localStorage[id]);
    product.qty = qty;
    this.addProduct(product);
  }

  addConfirmationInfo(fullName: string | null, total: number) {
    localStorage.setItem('fullName', fullName || '');
    localStorage.setItem('total', `${total}`);
  }

  getFullName(): string {
    return localStorage.getItem('fullName') as string;
  }

  getTotal(): string {
    return localStorage.getItem('total') as string;
  }

  clear(): void {
    localStorage.clear();
  }

  deleteProduct(product: Product) {
    localStorage.removeItem(`${product.id}`);
    alert(`${product.name} was removed from the cart`);
  }
}
