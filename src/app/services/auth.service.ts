import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilService } from './util.service';
import { Router } from '@angular/router';

export interface LoginData {
  id: string;
  passPharse: string;
  guid: string;
  isActive: boolean;

  surgery: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'username';
  public token: any = localStorage.getItem(`users`);
  public password: any;
  loggedInData: LoginData;

  passPharses: LoginData[];
  webLogin = true;

  isLoadingSubject = new BehaviorSubject(false);
  isLoading = this.isLoadingSubject.asObservable();

  constructor(
    private http: HttpClient,private utilService:UtilService, private router: Router) {
  }


  // eslint-disable-next-line @typescript-eslint/ban-types
  authenticationService(username: string, password: string) {
    return this.http.post('http://localhost:3000/login', {
      "username": "harry123",
      "password": "harry123"
    });
  }

  getLoggedInData(): LoginData {
    return this.loggedInData;
}

  isUserLoggedIn() {
      return true;
  }


}
