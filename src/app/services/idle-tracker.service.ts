import { Injectable } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdleTrackerService {
  public idle$: Subject<boolean> = new Subject();
  public wake$: Subject<boolean> = new Subject();
  public logout$: Subject<boolean> = new Subject();

  isIdle = false;
  private idleAfterSeconds = 300;
  private countDown;
  private logoutGracePeriod = false;
  constructor(private authService: AuthService) {
    fromEvent(document, 'mousemove').subscribe(() => this.onInteraction());
    fromEvent(document, 'touchstart').subscribe(() => this.onInteraction());
    fromEvent(document, 'keydown').subscribe(() => this.onInteraction());
    fromEvent(window, 'beforeunload').subscribe(() => this.onClose());
    this.onInteraction();
  }

  onClose() {
      // localStorage.clear();
  }

  onInteraction() {
    if (this.authService.isUserLoggedIn()) {
      if (!this.logoutGracePeriod) {
        if (this.isIdle) {
          this.isIdle = false;
          this.wake$.next(true);
        }
        clearTimeout(this.countDown);
        this.countDown = setTimeout(() => {
          this.isIdle = true;
          this.idle$.next(true);
        }, this.idleAfterSeconds * 1_000);
      }
    } else {
      clearTimeout(this.countDown);
    }
  }

  clearLogoutGracePeriod() {
    this.logoutGracePeriod = false;
    this.isIdle = false;
    this.onInteraction();
  }
}
