import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackBarComponent } from '../Pages/snackBar/snack-bar.component';
import { UserPermissions } from '../models/permission.model';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { LoggedInUserDetails, ProfileDetails } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  user = null;

  loggedInUserDetails: LoggedInUserDetails = null;
  selectedSurgeryId: string = null;
  constructor(
    private snackBar: MatSnackBar,
  ) {

  }

  openSnackBar(msg, action, status) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: msg,
        title: action
      },
      panelClass: status,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }

  closeSnackBar() {
    this.snackBar.dismiss();
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getUserId() {
    this.user = this.getLoggedInUserDetails()?.user;
    return this.user && this.user.user && this.user.user.id;
  }

  getUserRole() {
    this.user = this.getLoggedInUserDetails()?.user;
    return this.user && this.user.authorities[0] && this.user.authorities[0].authority;
  }

  getUserName() {
    this.user = this.getLoggedInUserDetails()?.user;
    return this.user && this.user.user && this.user.user.username;
  }










  isExistingUserPermission(surgeryId: number): boolean {
    this.user = this.getLoggedInUserDetails()?.user;
    let userpermissions: UserPermissions = this.user?.permissions;
    return _.some(userpermissions.MENU, { 'roleId': this.user.user.roleId, 'surgeryId': surgeryId });
  }




  isUserLogin() {
    return this.getLoggedInUserDetails()?.webLogin;
  }
  getLoggedInUserDetails(): LoggedInUserDetails {
    return environment.production ? this.loggedInUserDetails : JSON.parse(localStorage.getItem('loggedInUserDetails'));
  }
}
