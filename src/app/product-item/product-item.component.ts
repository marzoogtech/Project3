import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../model/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnChanges {
  @Input() product: Product = {} as any;

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.product = changes['product'].currentValue;
  }

  ngOnInit(): void {
  }

}
