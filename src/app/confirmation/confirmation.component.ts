import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  fullName: string = '';
  pirce: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
    ) {
      this.fullName = this.cartService.getFullName();
      this.pirce = Number(this.cartService.getTotal());
      this.cartService.clear();
    }


  ngOnInit(): void {
  }

  backToProductList() {
    this.cartService.clear()
    this.router.navigate(['']);
  }

}
