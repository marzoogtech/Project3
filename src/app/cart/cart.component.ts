import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  total: number = 0;
  fullName = new FormControl('');
  address = new FormControl('');
  creditNumber = new FormControl('');
  checkOutForm = new FormGroup({
    fullName: this.fullName,
    address: this.address,
    creditNumber: this.creditNumber
  });
  changedId: number = 0;
  changedQty: number = 0;


  // checkOutForm = new FormGroup()
 

  @Output() confirmCheckOut: EventEmitter<any> = new EventEmitter();

  constructor(
    private cartService: CartService,
    private router: Router
    ) {   
  }
  
  loadCart(): void {
    this.cartProducts = this.cartService.getCart();
  }
  
  ngOnInit(): void {
    this.loadCart()
    this.getTotalPrice();
  }

  qtyHander(event: Event, id: number){
    this.cartService.updateQty(id, +event);
    this.loadCart();
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.total = 0
    for (const product of this.cartProducts) {
      if (product.qty) this.total += product.price * product.qty;
    }
    return this.total;
  }


  checkOut() {
    if(this.checkOutForm.valid){
      this.cartService.addConfirmationInfo(this.fullName.value, this.total);
      this.router.navigate(['confirmation']);
    } else {
      alert('Make sure to enter valid full name (min 3 characters), address (min 6 character), and credit card number (15 number)');
    }
  }

  deleteProduct(product: Product) {
    this.cartService.deleteProduct(product);
    this.loadCart();
    this.getTotalPrice();
  }


}
