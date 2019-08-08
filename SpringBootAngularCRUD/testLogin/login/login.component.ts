import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {NgxPermissionsService} from 'ngx-permissions';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  display: boolean = false;
  emailId: any;
  emailAvailCheck: boolean = false;

  // toggleclick: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService,
              private permissionsService: NgxPermissionsService, private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    // this.loginService.loginService(this.username, this.password).then((resp: any) => {
    //   // console.log('login resp', resp);
    //   if (resp.success == '1') {
    //     sessionStorage.setItem('currentUser', JSON.stringify(resp.user));
    //     this.toastr.success(resp.msg, 'Success');
    //     this.router.navigate(['/pages/home']);
    //   } else {
    //     this.username = '';
    //     this.password = '';
    //     this.toastr.error('Userename/Password is wrong!', 'Login Fail');
    //   }
    // });
    this.ngxService.start();
    this.loginService.userAuthentication(this.username, this.password).subscribe((data: any) => {
        console.log('data_token', data);
        sessionStorage.setItem('userToken', data.access_token);
        sessionStorage.setItem('currentUser', JSON.stringify(data.User));
        let roles: Array<any> = [];
        for (let ob of data.User.authorities) {
          roles.push(ob.authority);
        }
        this.permissionsService.loadPermissions(roles);
        this.toastr.success('Login Successfully.', 'Success');
        this.ngxService.stop();
        this.router.navigate(['/pages/mydashbord']);
      },
      (err: HttpErrorResponse) => {
        // this.isLoginError = true;
        this.ngxService.stop();
        this.toastr.error('Userename/Password is wrong!', 'Login Fail');
        this.username = '';
        this.password = '';
        console.log('error', err.status);
      });
  }

  // onToggleClick() {
  //   if (this.toggleclick) {
  //     this.toggleclick = true;
  //   } else {
  //     this.toggleclick = true;
  //   }
  // }

  showDialog() {
    this.display = true;
    this.emailAvailCheck = false;
    this.emailId = null;
  }

  onForgotClick(email: any) {
    this.ngxService.start();
    console.log('forot email', this.emailId);
    this.loginService.getForgotService(email).then((resp: any) => {
      console.log('resp', resp);
      if (resp.success == 1) {
        this.toastr.success('Reset Password send successfully', 'Success');
        this.emailId = '';
        this.display = false;
      } else {
        this.toastr.error('Mail Sending Fail', 'Error');
      }
      this.ngxService.stop();
    }, (err: HttpErrorResponse) => {
      console.log('error', err);
    });
  }

  emailIdExistsCheck(idCheck: any) {
    this.loginService.emailCheck(idCheck).then((resp: any) => {
      console.log('check', resp);
      this.emailAvailCheck = !resp;
    });
  }

}
