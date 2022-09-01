import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { UserCartService } from 'src/app/service/userCart.service';
import { CheckModel } from './check-out.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  checkOut : CheckModel = new CheckModel
  formValue !: FormGroup;
  firstName: string = "";
  middleName: string = "";
  lastName: string ="";
  fullname: string = "";
  mobile: string = "";
  Address: string = "";
  data : any = {}
  
  visibility: boolean = true;
  public products: any = [];
  public grandTotal : number = 0;
  showEdit : boolean = true
  showUpdate !: boolean
  disabled : boolean = true
  
  constructor(private auth: AuthService,private userCart:UserCartService,
    private router: Router, private userCartService: UserCartService,
    private formbuilder: FormBuilder,private api: ApiService,) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', [Validators.required, Validators.pattern(/[0-9\+\-\ ]/)]],
      role: ['user'],
      status: [''],
      birthdate: Date,
      interest: ['', Validators.required],
      address: ['', Validators.required],
    })
    this.setCartDetails();
    this.getUserName();
  }

  placeOrder(){
    this.router.navigate(['/pendingpage']);
  }

  save(){
    this.visibility = false;
  }

  setCartDetails(){
    this.userCart.getUserCart().subscribe((data:any) => {
      this.grandTotal = data.grandTotal;
      this.products = data.orders
    })
  }

  getUserName(){
    this.userCartService.getUserDetails().subscribe((data:any) => {
      console.log(data)
      this.checkOut.username = data.username
      this.checkOut.firstname = data.firstname
      this.checkOut.middlename = data.middlename
      this.checkOut.lastname = data.lastname
      this.checkOut.mobilenumber = data.mobilenumber
      this.checkOut.email = data.email
      this.checkOut.birthdate = data.birthdate
      this.checkOut.address = data.address
      this.checkOut.interest = data.interest
      this.checkOut.role = data.role
      this.checkOut.status = data.status
      this.checkOut.id = data.id
      this.checkOut.password = data.password
      console.log(this.checkOut.address)
    })
  }

  onEdit(data : any) {
    this.disabled = false;
    this.showEdit = false;
    this.showUpdate = true;
    this.formValue.controls['address'].setValue(data.address)
  }

  updateUserDetails() {
    this.disabled = true;
    this.showEdit = true;
    this.showUpdate = false;
    this.checkOut.address = this.data.address;
    this.api.updateUser(this.checkOut, this.checkOut.id)
    .subscribe(res => {
      alert("Updated Successfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getUserName();
    })
}
}