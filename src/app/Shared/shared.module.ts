import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimerPipe } from './Pipes/format-timer.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdleComponent } from './components/idle/idle.component';
import { ScheduleLaterPopupComponent } from './components/schedule-later-popup/schedule-later-popup.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AutocompleteEnforceSelectionDirective } from './Directives/autocomplete-enforceSelection.directive';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@NgModule({
  declarations: [FormatTimerPipe, ModalComponent, IdleComponent, ScheduleLaterPopupComponent, ConfirmationDialogComponent,
    AutocompleteEnforceSelectionDirective,
    // InputDirective
    ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,NgxMatTimepickerModule,NgxMatMomentModule
  ],
  entryComponents: [ ModalComponent, ScheduleLaterPopupComponent],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
 ],
  exports: [FormatTimerPipe, ModalComponent,
    IdleComponent,AutocompleteEnforceSelectionDirective,NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,NgxMatMomentModule,
    //  InputDirective
    ]
})
export class SharedModule { }
