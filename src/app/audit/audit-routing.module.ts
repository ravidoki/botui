import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/authGuard';
import { AuditHomeComponent } from './audit-home/audit-home.component';

const routes: Routes = [
  {
    path: ':name',
    component: AuditHomeComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
