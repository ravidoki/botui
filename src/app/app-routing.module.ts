import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { AuthGuard } from './services/authGuard';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => AuthRoutingModule
  },
  {
    path: 'home', component: BaseLayoutComponent,
    children: [  
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m=> m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'auditHome',
        loadChildren: () => import('./audit/audit.module').then(m=> m.AuditModule)  ,
        canActivate: [AuthGuard]
      }
      
    ]
  },{
    path: '**',
    redirectTo: 'home/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
