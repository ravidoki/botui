import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { BlockCopyPasteDirective } from '../Shared/Directives/block-copy-paste.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule , MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [LoginComponent,   BlockCopyPasteDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class AuthModule { }
