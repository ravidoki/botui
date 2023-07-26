import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { UtilService } from "src/app/services/util.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MenuConstant } from 'src/app/Shared/constants/menu.constant';
import { ModalComponent } from 'src/app/Shared/components/modal/modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  user: any;
  password: any;

  phoneNumber: any = '';
  profileImage = '';
  name: string = '';
  userRole: any;
  @ViewChild('sidenav') public sidenav: MatSidenav;
  menuConstant = MenuConstant;

  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private utilService: UtilService,
  ) {

  }

  private innerWidth: number;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }
  ngOnInit() {
    this.user = this.utilService.getLoggedInUserDetails()?.user;

    let route: string = "admin";
    this.router.navigate(['/home', route]);
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1024) {
        this.globals.toggleSidebar = true;
      } else {
        this.globals.toggleSidebar = false;
      }
    });
  }

  isMenuEnable(menuCode: string) {
    return true;
  }

  logout() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      disableClose: true,
      data: {
        title: 'Log out',
        buttonYes: 'Confirm',
        buttonNo: 'Cancel',
        messageTitle: 'Are you sure you want to log out?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['login']);
          }
        });
  }



  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;

    if (this.innerWidth < 1024) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }


}
function delay(arg0: number): import('rxjs').OperatorFunction<import('@angular/cdk/layout').BreakpointState, unknown> {
  throw new Error('Function not implemented.');
}

