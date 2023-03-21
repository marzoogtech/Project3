import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, tap } from 'rxjs';
import { Product } from '../model/Product';
const url = '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpCleint: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
   return this.httpCleint.get<Product[]>(url);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(map(products => products.find(product => product.id === id)));
  }
}
