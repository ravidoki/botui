import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

// BOOTSTRAP COMPONENTS
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { HttpInterceptorService } from './services/httpInterceptor.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HeaderService } from './services/header.service';
import { AuthModule } from './auth/auth.module';

import { SnackBarComponent } from './Pages/snackBar/snack-bar.component';
import { SharedModule } from './Shared/shared.module';
import { IdleTrackerService } from './services/idle-tracker.service';
import { MaterialModule } from './material.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        AppComponent,
        
        
    ],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CommonModule,
       // Charts
        ReactiveFormsModule, FormsModule, HttpClientModule, ScrollingModule,
         MaterialModule,
        AuthModule],
    providers: [
        HeaderService,
        HttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
        IdleTrackerService
    ],
    entryComponents: [SnackBarComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}
