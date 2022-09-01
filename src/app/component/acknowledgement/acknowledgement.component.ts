import { Component, OnInit } from '@angular/core';
import { UserCartService } from 'src/app/service/userCart.service';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnInit {

  password !:string

  constructor(private userCartService : UserCartService) { }

  ngOnInit(): void {
    this.getUserName()
  }
  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      console.log(data)
      this.password = data.password
      console.log(this.password)
    })
  }
}


