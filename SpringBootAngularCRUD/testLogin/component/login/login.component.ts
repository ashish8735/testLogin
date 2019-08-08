import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  msg:any;
  usernam:any;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
    .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
      console.log(data);
      this.usernam=data;
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
     sessionStorage.setItem("user",this.usernam.User.username);
     sessionStorage.setItem("id",this.usernam.Id.id);
     //to get role
    // alert(this.usernam.User.authorities[0].authority);
      this.router.navigate(["/welcome"]);
    }, error => {
      this.msg="invalid username &password";
      //  alert(error.error.error_description) 
    });
  }

  ngOnInit() {
   window.sessionStorage.removeItem('token');
   sessionStorage.removeItem("user");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}

