import {
    Component, HostBinding, Input,
    OnDestroy,
    OnInit

} from '@angular/core';
import {
    Observable,Subscription
} from 'rxjs';
import {
    ThemeOptions
} from '../../../theme-options';
import {
    Router
} from '@angular/router';

import {
    browserRefresh
} from 'src/app/app.component';

import { UtilService } from 'src/app/services/util.service';
@Component({
    selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(public globals: ThemeOptions, private route: Router,
        private utilService: UtilService, private router: Router) {
    }

    @HostBinding('class.isActive') get isActiveAsGetter() {
        return this.isActive;
    }
    browserRefresh: any;

    testPatient = false;
    @Input() nhsNo = '9449305552';
    dob = '';
    gpAutoSelect: string = '';


    public height: string;
    @Input() sidenav: any;
    isActive: boolean;
    public config$: Observable<any>;
    subscriptions: Subscription = new Subscription();

    ngOnInit(): void {
        this.browserRefresh = browserRefresh;
        if (this.nhsNo === '' && this.dob === '') {
            if (localStorage.getItem(`users`)) {
                this.route.navigate(['/home/dashboard']);
            }
        }
        if (this.testPatient === false) {
            if (localStorage.getItem(`users`)) {
                this.route.navigate(['/home/dashboard']);
            }
        }
    }




    toggleSidebarMobile() {
        this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
    }

    toggleHeaderMobile() {
        this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
    }

    ngOnDestroy() {
        this.subscriptions?.unsubscribe();
    }
}
