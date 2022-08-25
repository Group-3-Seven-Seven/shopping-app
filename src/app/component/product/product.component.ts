import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Pipe, PipeTransform } from '@angular/core';
import { min } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList : any;
  searchKey: string = "";
  public filterByCategory: any;
  SortbyParam = '';
  SortDirection = 'asc';
  public filterByPriceList: any;
  min = 0;
  max = 0;


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
    this.cartService.addToCart(item);
    console.log(item)
  }

  filter(category: string){
    this.filterByCategory = this.productList.filter((a:any) => {
      if(a.category == category || category == ""){
        return a;
      }
    })
  }

  onSortDirection(){
    if(this.SortDirection === 'desc'){
      this.SortDirection = 'asc';
    }else{
      this.SortDirection = 'desc';
    }
  }

  filterByPrice(min: any, max:any){
  //   this.filterByPriceList = this.pricefilter.transform(value, args[min, max]);
  console.log("min")
    console.log(min)
    console.log("max")
    console.log(max)
  }

}
