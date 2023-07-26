import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { of,timer } from 'rxjs';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlankComponent } from '../signup/signup.component.spec';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;
  let utilService: UtilService;

  const userName = 'Jitendar';
  const password = 'jitendar';
  const otp = '123456';
  const LoggedInUserDetails = {
    "message": "Success",
    "statusCode": 0,
    "data": {
      "username": "gayathri",
      "password": "$2a$10$PJvb/TLay2aCnnws3S87Je5YEcA/UZoYueaow5kORg.WIBrEhl/7.",
      "accountNonExpired": true, "accountNonLocked": true,
      "credentialsNonExpired": true, "enabled": true,
      "user": {
        "id": "7dfb39f5-81bb-4180-b71f-9be8cdf7bbd5", "firstName": "Gayathri", "lastName": "Bommu",
        "nhsEmailId": "gayathri@techvizglobal.com", "phoneNumber": "+447774101285", "username": "gayathri", "roleId": 3,
        "roleName": "Health Care Agent", "verificationCode": null, "cnfPassword": null, "privacyPolicyAgreed": true,
        "termsAndConditionsAgreed": true, "subscribedToNewsletter": false, "countryCode": "GB",
        "surgeryMappings": [{
          "surgery": {
            "id": 5162, "code": "M81001", "name": "ST STEPHEN'S MEDICAL PARTNERSHIP",
            "aliasName": "", "addressLine1": "ST STEPHENS SURGERY", "addressLine2": "ADELAIDE STREET", "addressLine3": "REDDITCH", "addressLine4": "WORCESTERSHIRE",
            "addressLine5": "\n", "postcode": "B97 4AL", "contactTelephone": "01527 595600", "openDate": "19740401", "enabled": true
          }, "registrationStatus": "Approved"
        }],
        "token": null, "profileImage": "http://test-ayuv.westeurope.azurecontainer.io/api/getMessageSMSImage/false/ce3c88fb-6388-4236-b601-4e7e6d4a0961.png", "active": true
      },
      "authorities": [{ "authority": "ROLE_HEALTH_CARE_AGENT" }],
      "permissions": {
        "MENU": [{ "id": 90, "surgeryId": 5164, "accessTypeCode": "WRITE", "moduleCode": "DASHBOARD", "roleId": 3 }],
        "COMPONENT": {
          "AUDIT": [{ "id": 107, "surgeryId": 5164, "accessTypeCode": "NO_ACCESS", "moduleCode": "MESSAGE_AUDIT", "roleId": 3 }],
        }
      }, "token": "dbe1eecbd25fed164a1f11d9215021fd", "patientLock": "disabled",
      "userLock": "disabled", "profileImage": "http://test-ayuv.westeurope.azurecontainer.io/api/getMessageSMSImage/false/ce3c88fb-6388-4236-b601-4e7e6d4a0961.png"
    }, "timeStamp": "2022-03-14T16:58:13.0120353"
  }
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, MaterialModule, SharedModule, HttpClientTestingModule, RouterTestingModule.withRoutes([
          {
            path: 'home/dashboard',
            component: BlankComponent
          }
        ]), BrowserAnimationsModule],
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AuthService, UtilService]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    utilService = debugElement.injector.get(UtilService);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    fixture.detectChanges();
  });

  it('should  create component and should have form defined', fakeAsync(() => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    tick();
    expect(component.loginForm).toBeDefined();
  }));

  it('should login without otp to enter form', fakeAsync(() => {
    component.loginForm.get('userName').patchValue('Jitendar');
    component.loginForm.get('password').patchValue('jitendar');
    spyOn(authService, 'authenticationService').and.
      returnValue(
        of(LoggedInUserDetails));
    spyOn(component, 'handleLogin').and.stub();
    component.login();
    expect(authService.authenticationService).toHaveBeenCalled();
    expect(LoggedInUserDetails.statusCode).toBeFalsy();
    expect(component.handleLogin).toHaveBeenCalled();
  }));

  it('should validate login credentials and send otp', fakeAsync(() => {
    const loginResp = {
      "message": "Success",
      "statusCode": 101,
      "data": {
        "retryCount": 3,
        "resendCount": 3,
        "userId": "7dfb39f5-81bb-4180-b71f-9be8cdf7bbd5"
      },
      "timeStamp": "2022-03-14T16:02:34.3137117"
    };
    component.loginForm.get('userName').patchValue('gayathri');
    component.loginForm.get('password').patchValue('Gayathri@777');

    spyOn(authService, 'authenticationService').and.returnValue(of(loginResp));
    spyOn(utilService, 'openSnackBar').withArgs('OTP Send Successful', 'Success', `success`);
    spyOn(component, 'startCounter');
    component.login();
    expect(authService.authenticationService).toHaveBeenCalled();
    expect(utilService.openSnackBar).toHaveBeenCalled();
    expect(component.startCounter).toHaveBeenCalled();

  }));

  it('should check for userName and password values blank', fakeAsync(() => {
    component.loginForm.get('userName').patchValue('');
    component.loginForm.get('password').patchValue('');
    spyOn(utilService, 'validateAllFormFields').withArgs(component.loginForm);
    spyOn(authService, 'authenticationService')
      .withArgs(userName, password, { username: userName, password }).and
      .returnValue(
        of('{"mobileNumber":"+919887729374","surgeryUserId":"07b2c40a-b10e-4c11-a096-5f2c1f0a97ac","message":"OTP-SENT","statusCode":"0"}'));
    component.login();
    tick();
    expect(utilService.validateAllFormFields).toHaveBeenCalled();
    expect(authService.authenticationService).not.toHaveBeenCalled();
    flush();
  }));

  it('should validate OTP -> OTP not entered ', fakeAsync(() => {
    component.loginForm.get('otp').patchValue('');
    spyOn(utilService, 'validateAllFormFields').withArgs(component.loginForm);
    spyOn(authService, 'validateLoginOTP').withArgs({ otp, surgeryUserId: '123456' }).and.returnValue(of(''));
    component.otpValid();
    tick();
    expect(utilService.validateAllFormFields).toHaveBeenCalled();
    expect(authService.validateLoginOTP).not.toHaveBeenCalled();
    flush();
  }));

  it('should validate OTP-> valid OTP entered ', fakeAsync(() => {
    component.loginForm.get('otp').patchValue('201521');
    component.loginResponse = {
      mobileNumber: '+919887729374',
      surgeryUserId: '07b2c40a-b10e-4c11-a096-5f2c1f0a97ac',
      message: 'OTP-SENT',
      statusCode: 101
    };
    spyOn(authService, 'validateLoginOTP')
      .withArgs({ otp: component.loginForm.get('otp').value, surgeryUserId: component.loginResponse.surgeryUserId })
      .and.returnValue(of(LoggedInUserDetails));
    spyOn(component, 'handleLogin').and.stub();
    component.otpValid();
    expect(authService.validateLoginOTP).toHaveBeenCalled();
    expect(component.handleLogin).toHaveBeenCalled();
  }));

  it('should validate OTP-> InValid OTP entered ', fakeAsync(() => {
    component.loginForm.get('otp').patchValue('123456');
    component.loginResponse = {
      mobileNumber: '+919887729374',
      surgeryUserId: '07b2c40a-b10e-4c11-a096-5f2c1f0a97ac',
      message: 'OTP-SENT',
      statusCode: 101
    };
    const otpResp = {
      "message": "Incorrect OTP", "statusCode": 104,
      "data": {
        "retryCount": 0,
        "resendCount": 0,
        "userId": "7dfb39f5-81bb-4180-b71f-9be8cdf7bbd5"
      }, "timeStamp": "2022-03-14T18:04:41.4767356"
    }
    spyOn(authService, 'validateLoginOTP')
      .withArgs({ otp: component.loginForm.get('otp').value, surgeryUserId: component.loginResponse.surgeryUserId })
      .and.returnValue(of(otpResp));
    spyOn(utilService, 'openSnackBar').withArgs(otpResp.message, 'Error', `error`);
    component.otpValid();
    expect(authService.validateLoginOTP).toHaveBeenCalled();
    expect(utilService.openSnackBar).toHaveBeenCalled();
  }));

  it('generate otp again', fakeAsync(() => {
   // component.loginForm.get('otp').patchValue('123456');
    component.loginResponse = {
      mobileNumber: '+919887729374',
      surgeryUserId: '07b2c40a-b10e-4c11-a096-5f2c1f0a97ac',
      message: 'OTP-SENT',
      statusCode: 101
    };
    const requestData = {
      surgeryUserId: component.loginResponse.surgeryUserId,
      otpType: 'LOGIN'
    }
    const otpResp = {
      "message": "OTP send Successfully", "statusCode": 0,
      "data": {
        "retryCount": 3,
        "resendCount": 3,
        "userId": "7dfb39f5-81bb-4180-b71f-9be8cdf7bbd5"
      }, "timeStamp": "2022-03-14T18:04:41.4767356"
    }
    spyOn(authService, 'resendOtp')
      .withArgs(requestData)
      .and.returnValue(of(otpResp));
    spyOn(utilService, 'openSnackBar').withArgs('OTP send Successfully', 'Success', `success`);
    spyOn(component.loginForm,'updateValueAndValidity');
    spyOn(component,'startCounter');
    component.generateOtpAgain();
    expect(authService.resendOtp).toHaveBeenCalled();
    expect(otpResp.statusCode).toBeFalsy();
    expect(utilService.openSnackBar).toHaveBeenCalled();
    expect(component.loginForm.updateValueAndValidity).toHaveBeenCalled();
    expect(component.startCounter).toHaveBeenCalled();
  }));

  it('should call handle login', fakeAsync(() => {
    const responseData = { "username": "kuldeep", "password": "$2a$10$nulFHsVOUWVB5pmtwjVRS.XYf1etZlT0f89vVVvzgmOIdvQ0DhNTe", "accountNonExpired": true, "accountNonLocked": true, "credentialsNonExpired": true, "enabled": true, "user": { "id": "07b2c40a-b10e-4c11-a096-5f2c1f0a97ac", "userFirstName": "kuldeep", "userLastName": "vaishnav", "nhsEmailId": "kuldeep@techvizglobal.com", "phoneNumber": "+919887729374", "username": "kuldeep", "roleId": 4, "roleName": "", "verificationCode": null, "cnfPassword": null, "privacyPolicyAgreed": true, "termsAndConditionsAgreed": true, "subscribedToNewsletter": true, "countryCode": "IN", "surgeryMappings": [{ "surgery": { "id": 1, "code": "A81001", "name": "THE DENSHAM SURGERY", "aliasName": "COXHOE11", "addressLine1": "THE HEALTH CENTRE", "addressLine2": "LAWSON STREET", "addressLine3": "STOCKTON-ON-TEES", "addressLine4": "CLEVELAND", "addressLine5": "\n", "postcode": "TS18 1HU", "contactTelephone": "01642 672351", "openDate": "19740401" }, "registrationStatus": "Approved" }, { "surgery": { "id": 2, "code": "A81002", "name": "QUEENS PARK MEDICAL CENTRE", "aliasName": "", "addressLine1": "QUEENS PARK MEDICAL CTR", "addressLine2": "FARRER STREET", "addressLine3": "STOCKTON ON TEES", "addressLine4": "CLEVELAND", "addressLine5": "\n", "postcode": "TS18 2AW", "contactTelephone": "01642 679681", "openDate": "19740401" }, "registrationStatus": "Pending" }, { "surgery": { "id": 4, "code": "A81005", "name": "SPRINGWOOD SURGERY", "aliasName": "", "addressLine1": "SPRINGWOOD SURGERY", "addressLine2": "RECTORY LANE", "addressLine3": "GUISBOROUGH", "addressLine4": "", "addressLine5": "\n", "postcode": "TS14 7DJ", "contactTelephone": "01287 619611", "openDate": "19740401" }, "registrationStatus": "Pending" }, { "surgery": { "id": 5, "code": "A81006", "name": "TENNANT STREET MEDICAL PRACTICE", "aliasName": "", "addressLine1": "TENNANT ST MEDICAL PRACT", "addressLine2": "TENNANT STREET", "addressLine3": "STOCKTON-ON-TEES", "addressLine4": "CLEVELAND", "addressLine5": "\n", "postcode": "TS18 2AT", "contactTelephone": "01642 613331", "openDate": "19740401" }, "registrationStatus": "Pending" }, { "surgery": { "id": 3, "code": "A81004", "name": "ACKLAM MEDICAL CENTRE", "aliasName": "", "addressLine1": "TRIMDON AVENUE", "addressLine2": "ACKLAM", "addressLine3": "MIDDLESBROUGH", "addressLine4": "", "addressLine5": "\n", "postcode": "TS5 8SB", "contactTelephone": "01642 827697", "openDate": "19740401" }, "registrationStatus": "Pending" }], "token": null, "active": true }, "authorities": [{ "authority": "ROLE_SUPER_ADMIN" }], "permissions": [], "token": "e8351aae4d94a95fba8807773649780b" }
    component.handleLogin(responseData);
    tick();
    // expect (routerSpy.navigate).toHaveBeenCalledWith('home/dashboard');
    flush();

  }));

  
  it('should call signIn ', fakeAsync(() => {
    component.signIn();
    expect(component.loginResponse).toBeNull();
    expect(component.counter).toEqual(120);
    expect(component.totalSeconds).toEqual(120);
    expect(component.tick).toEqual(1000);
  }));
});
