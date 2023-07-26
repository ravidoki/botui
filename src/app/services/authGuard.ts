import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UtilService } from './util.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor( private router: Router,private utilService:UtilService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       // console.log('canActivate AuthGaurd',this.utilService.getLoggedInUserDetails()?.token);
       /*  if (localStorage.getItem(`userToken`)) {
            return true;
        } */

            return true;


        //this.router.navigate(['login']);
    }
}
