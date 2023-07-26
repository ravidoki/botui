import { NgModule } from '@angular/core';
import { MessagesAuditComponent } from './messages-audit/messages-audit.component';
import { AuditHomeComponent } from './audit-home/audit-home.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { AuditRoutingModule } from './audit-routing.module';
import { ModalComponent} from "./modal/modal.component";

@NgModule({
  declarations: [ AuditHomeComponent, MessagesAuditComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AuditRoutingModule
  ],
  providers:[DatePipe]
})
export class AuditModule { }
