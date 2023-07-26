import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import * as moment from 'moment';
import { format } from 'date-fns'

@Component({
  selector: 'app-schedule-later-popup',
  templateUrl: './schedule-later-popup.component.html',
  styleUrls: ['./schedule-later-popup.component.scss']
})
export class ScheduleLaterPopupComponent {
  scheduleTime = new FormControl('');
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData, private dialogRef: MatDialogRef<ScheduleLaterPopupComponent>) {
  }

  sendMessage() {
    if (this.scheduleTime.value) {
      if (this.getCurrentDateTime() < new Date(format(new Date(this.scheduleTime?.value), 'yyyy-MM-dd HH:mm'))) {
        this.dialogRef.close({ event: 'Yes', data: this.scheduleTime });
      }
    }
    else {
      this.dialogRef.close({ event: 'Yes', data: '' })
    }
  }
  clearValue() {
    this.scheduleTime.patchValue('');
  }

  getCurrentDateTime() {
    return new Date();
  }
  
  getMinDateTime() {
    return new Date(new Date().getTime() + 60000);
  }

  pickerClicked() {
    if (!this.scheduleTime.value) {
      this.scheduleTime.patchValue(this.getMinDateTime());
    }
  }
}
