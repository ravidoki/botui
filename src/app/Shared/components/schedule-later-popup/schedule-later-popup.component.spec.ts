import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleLaterPopupComponent } from './schedule-later-popup.component';

describe('ScheduleLaterPopupComponent', () => {
  let component: ScheduleLaterPopupComponent;
  let fixture: ComponentFixture<ScheduleLaterPopupComponent>;
  const dialogRefMock = jasmine.createSpyObj('MatDialogRef', [
    'close',
]);
let dialogData =  {
    title: 'Send Message',
    buttonYes: 'Send',
    buttonNo: 'Cancel',
    messageTitle: 'Do you want to Schedule Message for later?'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ScheduleLaterPopupComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData }, {
          provide: MatDialogRef,
          useValue: dialogRefMock
      },]
    });
    fixture = TestBed.createComponent(ScheduleLaterPopupComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('sendMessage', () => {
    it('makes expected calls', () => {
      const matDialogRefStub = fixture.debugElement.injector.get(
        MatDialogRef
      );
      component.scheduleTime.patchValue(new Date(new Date().getTime() + 5*60000));
      component.sendMessage();
      expect(matDialogRefStub.close).toHaveBeenCalled();
    });
  });

  describe('clear Value', () => {
    it('makes expected calls', () => {
     spyOn(component, 'clearValue').and.callThrough();
      component.clearValue();
      expect(component.clearValue).toHaveBeenCalled();
      expect(component.scheduleTime.value).toBe('');
    });
  });
  describe('getCurrentDateTime', () => {
    it('makes expected calls', () => {
     spyOn(component, 'getCurrentDateTime').and.callThrough();
      component.getCurrentDateTime();
      expect(component.getCurrentDateTime).toHaveBeenCalled();
    });
  });
});
