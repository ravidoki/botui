import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAyuv } from 'src/app/models/user';
import { AuditService } from 'src/app/services/audit.service';
import { UserService } from 'src/app/services/user.service';
import { ComponentConstant } from 'src/app/Shared/constants/component.constant';
import { MenuConstant } from 'src/app/Shared/constants/menu.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audit-home',
  templateUrl: './audit-home.component.html',
  styleUrls: ['./audit-home.component.scss']
})
export class AuditHomeComponent implements OnInit, OnDestroy {

  selectedTabIndex: any;
  componentList = [];
  componentConstant = ComponentConstant;
  subscriptions:Subscription = new Subscription();
  constructor(
    private auditService: AuditService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log("");
  }

  isComponentExist(componentCode) {
    return true;
  }

  onTabClick(event) {
    this.userRouteChange(event.index);
    this.selectedTabIndex = event.index;
  }

  private userRouteChange(index: number)
  {
    var name: string = '';
    switch(index)
    {
      case 0:
        name = 'user';
        break;
      case 1:
        name = 'message';
        break;
    }
    this.router.navigate(["home/auditHome", name]);
  }


  getAllUsers(): void {
    this.subscriptions.add(this.userService.getUsers().subscribe(
      (usersList: UserAyuv[]) => {

      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }
}
