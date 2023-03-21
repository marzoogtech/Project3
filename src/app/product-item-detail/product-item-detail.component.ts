import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product = {} as any;
  products: Product[] = []
  selectedQty: number = 1;
  totalPrice: number = 0;

  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private http: HttpClient
    ) { }

  async ngOnInit(): Promise<void> {
    const id  = this.activeRouter.snapshot.params['id'];
    this.productService.getProductById(+id).subscribe(res => this.product = res as Product)
    this.product.qty = 1;
  }

  addToCart(): void {
    this.product.qty = this.selectedQty; 
    this.cartService.addProduct(this.product);    
  }

  selectQtyHandler(event: Event) {
    this.product.qty = this.selectedQty;
  }
  
}

