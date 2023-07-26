import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { timer, Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ProfileDetails } from 'src/app/models/UserLogin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginResponse: any;
  countDown: Subscription;
  subscriptions: Subscription = new Subscription();
  counter = 120;
  totalSeconds = 120;
  tick = 1000;
  passwordType: string = 'password';
  retryCounts: number;
  totalRetryCounts: number;
  resendCounts: number;
  totalResendCounts: number;
  inputFieldMaxLength = environment.inputFieldMaxLength;
  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthService, private utilService: UtilService) {
    localStorage.clear();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  signIn()
  {
    this.ngOnInit();
    this.loginResponse = null;
    this.countDown?.unsubscribe();
    this.counter = 120;
    this.totalSeconds = 120;
    this.tick = 1000;
  }

  login() {
    const password = this.loginForm.get('password').value;
    if (password) {
      this.subscriptions.add(this.authService.authenticationService("","").subscribe((response: any) => {
        console.log(response, "login")
        if (!response.statusCode) {
          this.handleLogin(response);
        }
      }));
    } else {
      this.subscriptions.add(this.utilService.validateAllFormFields(this.loginForm));
    }
  }


  handleLogin(responseData) {
    const token = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(this.loginForm.value), 'secret key 123').toString());
    let details = {
      userToken: token,
      token: responseData.token,
      user: responseData,
      webLogin: true,
      quickLogin: false
    }
    if (environment.production) {
      this.utilService.loggedInUserDetails = details;
    } else {
      localStorage.setItem('loggedInUserDetails', JSON.stringify(details));
    }
    this.router.navigate(['home/dashboard']);
    this.utilService.openSnackBar('Login Successful', 'Success', `success`);
  }



  ngOnDestroy() {
    this.countDown?.unsubscribe();
    this.subscriptions?.unsubscribe();
  }
}
