import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForgotPassword, Password, RegisterUser, UserAyuv, UserAyuvCreate } from '../models/user';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getAyuvUser(): Observable<UserAyuv[]> {
    return this.httpClient.get<UserAyuv[]>(`${environment.baseUrl}/getAllUsers`);
  }
  getUsers(){
    return this.httpClient.get<UserAyuv[]>(`${environment.baseUrl}/getUsers`);
  }

  public getUserOne(id: string) {
    return this.httpClient.get<UserAyuv[]>(`${environment.baseUrl}/getAyvuUser/${id}`,);
  }

  public getUserByUsername() {
    return this.httpClient.get<UserAyuv[]>(`${environment.baseUrl}/user/byUsername/`);
  }


  public deleteUser(userId: string, surgeryId: number) {
    return this.httpClient.delete<User>(`${environment.baseUrl}/deleteUser?id=${userId}&surgeryIds=${surgeryId}`);
  }

  public createAyuvUser(userform: UserAyuvCreate): Observable<UserAyuvCreate> {
    return this.httpClient.post<UserAyuvCreate>(`${environment.baseUrl}/createAyvuUser`, userform);
  }

  public updateAyuvUser(userAyuv: UserAyuv): Observable<UserAyuv> {
    return this.httpClient.put<UserAyuv>(`${environment.baseUrl}/updateAyvuUser/${userAyuv.ayvuId}`, userAyuv);
  }


  public verifyUser(userId: string, verifyCode: string): Observable<UserAyuv> {
    return this.httpClient.get<any>(`${environment.baseUrl}/verifyRegisterUser/${userId}/${verifyCode}`,);
  }


  getPendingUsers(surgeryIdUrl) {
    return this.httpClient.get<any>(`${environment.baseUrl}/getPendingRegisterUsersBySurgery?${surgeryIdUrl}`);
  }

  getUsersByGp(surgeryId) {
    return this.httpClient.get<any>(`${environment.baseUrl}/getAllUsersByGP?gpId=${surgeryId}`);
  }

  approveUser(userId: string, surgeryId: number) {
    return this.httpClient.post<any>(`${environment.baseUrl}/user/approve`, {userId: userId, surgeryId: surgeryId});
  }

  rejectUser(userId: string, surgeryId: number) {
    return this.httpClient.post<any>(`${environment.baseUrl}/user/reject`, {userId: userId, surgeryId: surgeryId});
  }

  public registerAyuvUser(userform: RegisterUser): Observable<RegisterUser> {
    return this.httpClient.post<RegisterUser>(`${environment.baseUrl}/registerUser`, userform);
  }

  changePassword(userform) {
    return this.httpClient.post<Password>(`${environment.baseUrl}/updatePassword`, userform);
  }

  forgotPassword(emailOrMobile) {
    let url = `${environment.baseUrl}/forgetPassword`;
    if (emailOrMobile.email) {
      url += `?emailId=${emailOrMobile.email}`;
    } else {
      url += `?mobileNo=${encodeURIComponent(emailOrMobile.mobileNo)}`;
    }
    return this.httpClient.get(url);
  }

  resetForgotPassword(data) {
    return this.httpClient.post(`${environment.baseUrl}/resetPassword`, data);
  }

  resentOtp(surgeryUserId) {
    return this.httpClient.get(`${environment.baseUrl}/resendOtp?otpType=FORGET_PASSWORD&surgeryUserId=${surgeryUserId}`);
  }

  resetPassword(email: string, password: string) {
    return this.httpClient.post<ForgotPassword>(`${environment.baseUrl}/updateForgotPassword/${email}/${password}`, null);
  }

  generateOTP(phone: string) {
    let params = new HttpParams();
    params = params.append('mobilenumber', phone);
    return this.httpClient.post(`${environment.baseUrl}/otpGenerator`, null, { params });
  }

  validateOTP(otp) {
    let params = new HttpParams();
    params = params.append('otpnumber', otp);
    return this.httpClient.post(`${environment.baseUrl}/otpValidate`, null, { params });
  }

  validateLoginOTP(data) {
    return this.httpClient.get(`${environment.baseUrl}/api/validateLoginOtp?otp=${data.otp}&surgeryUserId=${data.surgeryUserId}`);
  }

  getCountry() {
    return this.httpClient.get(`${environment.baseUrl}/countryAll`);
  }

  logout() {
    return this.httpClient.post(`${environment.baseUrl}/logoutPage`, {});
  }

  getAllSurgeries() {
    return this.httpClient.get(`${environment.baseUrl}/getSurgeries`);
  }

  public getUser(url) {
    return this.httpClient.get<User>(url);
  }

  public updateUserRole(userId, roleId) {
    return this.httpClient.get<boolean>(`${environment.baseUrl}/updateUserRole/${userId}/${roleId}`);
  }

  public reactiveUser(userId, surgeryId) {
    return this.httpClient.post<any>(`${environment.baseUrl}/reactiveUser?id=${userId}&surgeryId=${surgeryId}`,null);
  }
  verifyUpdateUser(emailOrMobile) {
    let url = `${environment.baseUrl}/verifyUpdateUser`;
    if (emailOrMobile.email) {
      url += `?emailId=${emailOrMobile.email}`;
    } else {
      url += `?mobileNo=${encodeURIComponent(emailOrMobile.mobileNo)}`;
    }
    return this.httpClient.get(url);
  }
  validateUpdateUserOtp(otp:number) {
    let url = `${environment.baseUrl}/validateUpdateUserOtp?otp=${otp}`;
    return this.httpClient.get(url);
  }
  updateUser(requestData:any){
    let url = `${environment.baseUrl}/updateUser`;
    return this.httpClient.post(url,requestData);
  }
}
