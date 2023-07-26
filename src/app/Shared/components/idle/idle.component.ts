import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.scss']
})
export class IdleComponent implements OnInit, OnDestroy {
  timer: any = 0;
  countDown: Subscription;
  counter = 120;
  totalSeconds =120;
  tick = 1000;
  constructor(private router: Router, private userService: UserService, 
    public currentDialogRef: MatDialogRef<IdleComponent>,
    private utilService: UtilService, private authService:AuthService,public dialog: MatDialog,) {
      if(!this.authService.isUserLoggedIn()) {
        this.currentDialogRef.close();
      }
    }

  ngOnInit(): void {
    this.countDown = timer(0, this.tick).subscribe((e) => {
      if(!this.authService.isUserLoggedIn()) {
        this.currentDialogRef.close();
        this.countDown?.unsubscribe();
        this.countDown = null;
      } else  if (e < this.totalSeconds) {
        return --this.counter;
      } else {
        this.countDown?.unsubscribe();
        this.countDown = null;
        this.logout();
      }
    });
  }

  continueSession() {
    this.countDown?.unsubscribe();
    this.countDown = null;
    this.currentDialogRef.close('Yes');
  }
  
  logout() {
    this.userService.logout().subscribe();
    this.dialog.closeAll();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.utilService.openSnackBar('You have been logged out due to Inactivity.', 'Success', `success`);  
  }

  ngOnDestroy(): void {
    this.countDown?.unsubscribe();
  }
}
