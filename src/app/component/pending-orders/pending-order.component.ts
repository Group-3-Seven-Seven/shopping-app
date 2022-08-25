import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent implements OnInit {

  image_url = "assets/images/cart";
  public products: any = [];
  public grandTotal : number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getUniqueProducts()
    .subscribe((data:any) => {
      this.products = data;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

}
