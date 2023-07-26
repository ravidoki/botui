import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../../theme-options';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  animations: [

    trigger('architectUIAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            opacity: 0,
            display: 'flex',
            flex: '1',
            transform: 'translateY(-20px)',
            flexDirection: 'column'
          }),
        ]),
        query(':enter', [
          animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        ], { optional: true }),

        // query(':leave', [
        //   animate('600ms ease', style({opacity: 0, transform: 'translateY(-20px)'})),
        //  ], { optional: true })
      ]),
    ])
  ]
})

export class BaseLayoutComponent implements OnInit, AfterContentChecked {

  // @select('config') public config$: Observable<any>;
  isLoading = false;
  constructor(
    public globals: ThemeOptions, private router: Router,
    private cdref: ChangeDetectorRef,
    private utilService: UtilService
  ) { }
  ngOnInit(): void {
    if (!this.utilService.getLoggedInUserDetails()?.token) {
      this.router.navigate(['/login'])
    }

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }
}



