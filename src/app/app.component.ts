import {Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { IdleTrackerService } from './services/idle-tracker.service';
import { IdleComponent } from './Shared/components/idle/idle.component';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  
  subscription: Subscription;
  isLoading: boolean;
  title = 'dashboard';
  constructor(private authService: AuthService, private idleService: IdleTrackerService, private dialog: MatDialog) {
    idleService.idle$.subscribe(s => {
      if(s) {
      // this.idleService.setLogoutGracePeriod();
      this.showLogoutPopup();
      }
    });
    idleService.wake$.subscribe(s => console.log('im awake!'));

     this.authService.isLoading.subscribe((val) => { this.isLoading = val; });
  }
 
 
  showLogoutPopup() {
    const dialogRef = this.dialog.open(IdleComponent, {
      width: 'auto',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'Yes') {
        this.idleService.clearLogoutGracePeriod();
      }
    });
  }
}

