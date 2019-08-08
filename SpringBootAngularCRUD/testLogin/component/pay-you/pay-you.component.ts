import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-pay-you',
  templateUrl: './pay-you.component.html',
  styleUrls: ['./pay-you.component.css']
})
export class PayYouComponent implements OnInit {
  public payuform: any = {};
  disablePaymentButton: boolean = true;
  dataa:any;
  msg:any;
  message:any;
  constructor(private http: HttpClient,private router:Router,private apiService:ApiService,private userIdle: UserIdleService) { }

  confirmPayment() {
    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.firstname,
      phone: this.payuform.phone,
      productInfo: this.payuform.productinfo,
      amount: this.payuform.amount,
    }
    // return this.http.post<any>('http://localhost:8088/payment/payment-details', paymentPayload)
    this.apiService.payment(paymentPayload).subscribe(
      data => {
      console.log(data);
      this.payuform.txnid = data.txnId;
      this.payuform.surl = data.sUrl;
      this.payuform.furl = data.fUrl;
      this.payuform.key = data.key;
      this.payuform.hash = data.hash;
      //this.payuform.txnid = data.txnId;
        this.disablePaymentButton = false;
    this.test();
    }, error1 => {
        console.log(error1);
      })
  }
  test(){
    this.apiService.getStatus(this.payuform.txnid).subscribe(data=>{
      console.log(data);
      this.dataa=data;
      if(this.dataa.paymentStatus==null)
      {
        this.msg="Please Fill all the Details"
      }
      else if(this.dataa.paymentStatus=="Pending")
      {
        this.msg="GrEaT OnE StEp To Go!";
        this.message="Click on Submit to Proceed!! please do not go back 'Transaction is in Process'";

       this.ngOnInit();

      }
      else if(this.dataa.paymentStatus=="Success")
      {
    alert("Transaction success");
    this.router.navigate(["/welcome"]);
  }   
   else 
      {
alert("error please try again");
this.router.navigate(["/welcome"]);

      }
      console.log(data);
          })
  }
  ngOnInit() 
  {
    setTimeout(() => {
this.test();
   }
   ,10000); 

  }


}

