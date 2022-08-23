import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList : any;
  searchKey: string = "";
  public filterByCategory: any;

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(data => {
      this.productList = data;
      this.filterByCategory = data;
      this.productList.forEach((a: any) => {
        Object.assign(a, {quantity:1, total: a.price});
      });
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addToCart(item: any){
    console.log("add to cart item")
    console.log(item)
    this.cartService.addToCart(item);
  }

  filter(category: string){
    this.filterByCategory = this.productList.filter((a:any) => {
      if(a.category == category || category == ""){
        return a;
      }
    })
  }
}
