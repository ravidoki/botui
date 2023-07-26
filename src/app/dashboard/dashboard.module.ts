import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialModule } from 'src/app/material.module';
import { BaseLayoutComponent } from '../Layout/base-layout/base-layout.component';
import { SearchBoxComponent } from '../Layout/Components/header/elements/search-box/search-box.component';
import { UserBoxComponent } from '../Layout/Components/header/elements/user-box/user-box.component';
import { HeaderComponent } from '../Layout/Components/header/header.component';
import { PageTitleComponent } from '../Layout/Components/page-title/page-title.component';
import { LogoComponent } from '../Layout/Components/sidebar/elements/logo/logo.component';
import { SidebarComponent } from '../Layout/Components/sidebar/sidebar.component';
import { SpinnerComponent } from '../Layout/Components/spinner/spinner.component';
import { PagesLayoutComponent } from '../Layout/pages-layout/pages-layout.component';
import { SnackBarComponent } from '../Pages/snackBar/snack-bar.component';
import { SharedModule } from '../Shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
    imports: [
        DashboardRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule,
        LoadingBarRouterModule,
        ImageCropperModule
    ],
    declarations: [
        DashboardComponent,

        BaseLayoutComponent,
        PagesLayoutComponent,
        PageTitleComponent,

        // HEADER

        HeaderComponent,
        SearchBoxComponent,
        UserBoxComponent,

        // SIDEBAR

        SidebarComponent,
        LogoComponent,

        SpinnerComponent,
        SnackBarComponent,
    ]
})

export class DashboardModule {

}
