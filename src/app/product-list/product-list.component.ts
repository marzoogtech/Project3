import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/Product';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []

  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
    ) { }


  ngOnInit(): void {
    
    this.productService.getProducts().subscribe(res => this.products = res as Product[])
   

  }
  
  goToProduct(product: Product){
    this.router.navigate(['product', product.id])
  }
}
