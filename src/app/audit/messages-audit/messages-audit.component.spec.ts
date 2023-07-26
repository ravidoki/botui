import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UserAudit } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

import { MessagesAuditComponent } from './messages-audit.component';
import { AuditService } from 'src/app/services/audit.service';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

describe('MessagesAuditComponent', () => {
  let component: MessagesAuditComponent;
  let fixture: ComponentFixture<MessagesAuditComponent>;
  let debugElement: DebugElement;
  let auditService: AuditService;

  const userName = 'Jitendar';
  const fromDate = moment(new Date()).format('YYYY-MM-DD');
  const toDate = moment(new Date()).format('YYYY-MM-DD');
  const templateType = 'NEW_MESSAGE';
  const statusType = 'SUCCESS';
  const sorting = { active:'lastModifiedDate', direction: 'desc'}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [MessagesAuditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserService, AuditService, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesAuditComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    auditService = debugElement.injector.get(AuditService);
    fixture.detectChanges();
  });

  it('should  create component and createForm', fakeAsync(() => {
    expect(component).toBeTruthy();
    spyOn(component, 'createForm');
    component.createForm();
    tick();
    expect(component.createForm).toHaveBeenCalled();
  }));

  it('should  call pageChangeEvent method', () => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    component.sentMessageAuditForm
      .get('fromDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('toDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('templateType')
      .patchValue('NEW_MESSAGE');
    component.sentMessageAuditForm.get('statusType').patchValue('SUCCESS');

    spyOn(auditService, 'smsSentBetweenDates')
      .and.returnValue(
        of({
          fromDate: 'Fri Nov 26 00:00:00 UTC 2021',
          toDate: 'Thu Dec 02 00:00:00 UTC 2021',
          userName: 'kuldeep',
          totalSmsSent: 5,
          smsStatusDto: [
            {
              id: 503,
              smsSid: 'SMd4560d92f1c14b3f9270172353eab1e6',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+447464867962',
              messageSid: null,
              smsFrom: 'KD5051',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nflue vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY. Please click the link to view the attachment: https://dev.ayuv.techvizglobal.co.uk/sms?fileId=2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              senderUserName: 'kuldeep',
              dateCreated: 1647317847000,
              dateSent: null,
              dateUpdated: 1647317847000,
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              allowResponse: false,
              responded: false,
            }
          ],
        })
      );
      let pageEvent = {
        length: 1,
        pageIndex: 0,
        pageSize: 10,
        previousPageIndex: 0
      }
    component.pageChangeEvent(pageEvent);
    expect(auditService.smsSentBetweenDates).toHaveBeenCalled();
    expect(component.isDateFilterValid).toBeTruthy();
  });
  
  it('should  call matSortChange method', () => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    component.sentMessageAuditForm
      .get('fromDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('toDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('templateType')
      .patchValue('NEW_MESSAGE');
    component.sentMessageAuditForm.get('statusType').patchValue('SUCCESS');

    spyOn(auditService, 'smsSentBetweenDates')
      .and.returnValue(
        of({
          fromDate: 'Fri Nov 26 00:00:00 UTC 2021',
          toDate: 'Thu Dec 02 00:00:00 UTC 2021',
          userName: 'kuldeep',
          totalSmsSent: 5,
          smsStatusDto: [
            {
              id: 503,
              smsSid: 'SMd4560d92f1c14b3f9270172353eab1e6',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+447464867962',
              messageSid: null,
              smsFrom: 'KD5051',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nflue vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY. Please click the link to view the attachment: https://dev.ayuv.techvizglobal.co.uk/sms?fileId=2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              senderUserName: 'kuldeep',
              dateCreated: 1647317847000,
              dateSent: null,
              dateUpdated: 1647317847000,
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              allowResponse: false,
              responded: false,
            }
          ],
        })
      );
    let event = {
      active: "logoutDate",
      direction: "asc"
    }
   let userAudit: UserAudit[] = [{
      data: [{
        id: '1',
        gpid: '1',
        loginDate: 1,
        logoutDate: 1,
        userName: 'Haritha'
        }],
        totalElement: 1
    }];
    component.dataSource = new MatTableDataSource(userAudit);
    component.matSortChange(event);
    expect(auditService.smsSentBetweenDates).toHaveBeenCalled();
    expect(component.isDateFilterValid).toBeTruthy();
  });

  it('should  call downloadResults method', () => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    component.sentMessageAuditForm
      .get('fromDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('toDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('templateType')
      .patchValue('NEW_MESSAGE');
    component.sentMessageAuditForm.get('statusType').patchValue('SUCCESS');

    spyOn(auditService, 'smsSentBetweenDates')
      .and.returnValue(
        of({
          fromDate: 'Fri Nov 26 00:00:00 UTC 2021',
          toDate: 'Thu Dec 02 00:00:00 UTC 2021',
          userName: 'kuldeep',
          totalSmsSent: 5,
          smsStatusDto: [
            {
              id: 503,
              smsSid: 'SMd4560d92f1c14b3f9270172353eab1e6',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+447464867962',
              messageSid: null,
              smsFrom: 'KD5051',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nflue vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY. Please click the link to view the attachment: https://dev.ayuv.techvizglobal.co.uk/sms?fileId=2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              senderUserName: 'kuldeep',
              dateCreated: 1647317847000,
              dateSent: null,
              dateUpdated: 1647317847000,
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              allowResponse: false,
              responded: false,
            }
          ],
        })
      );
    component.downloadResults();
    expect(auditService.smsSentBetweenDates).toHaveBeenCalled();
    expect(component.isDateFilterValid).toBeTruthy();
  });

  it('should call ngOnInIt', () => {
    const usersList = [
      {
        ayvuId: '035f01aa-89c6-479d-8f39-56ebdbc0a958',
        userFirstName: 'Subhashini',
        userLastName: 'Garapati',
        nhsEmailId: 'subhashinigarapati@gmail.com',
        phoneNumber: '07464167962',
        username: 'Subhashini1',
        roleId: 1,
        roleName: 'Admin',
        verificationCode:
          '2jEktbHKcZyvwjmtKpMFxp8OoFR4vLc24K6MJbrHyPlI5teMKhmI7qf70EULaduO',
        cnfPassword: null,
        privacyPolicyAgreed: false,
        termsAndConditionsAgreed: false,
        subscribedToNewsletter: false,
        countryCode: 'GB',
        gpMappings: [],
        token: null,
        active: true,
      },
    ];
    let res = {
      'BULK_MSG': "Bulk Message",
      'INTERACTIVE_MSG': "Interactive Message",
      'SCHEDULE_MSG': "Schedule Message",
      'TEXT_MSG': "Text Message",
      'VIDEO_MSG': "Video Message"
    };
    (auditService as any).usersListObs$ = of(usersList);
    spyOn(component.templateType, 'sort');
    spyOn(auditService, 'getTemplateType')
      .and.returnValue(of(res));
    component.ngOnInit();
    expect(component.usersList.length).toEqual(usersList.length);
    expect(auditService.getTemplateType).toHaveBeenCalled();
  });

  it('should call getAllUsers', fakeAsync(() => {
    const usersList = [
      {
        ayvuId: '035f01aa-89c6-479d-8f39-56ebdbc0a958',
        userFirstName: 'Subhashini',
        userLastName: 'Garapati',
        nhsEmailId: 'subhashinigarapati@gmail.com',
        phoneNumber: '07464167962',
        username: 'Subhashini1',
        roleId: 1,
        roleName: 'Admin',
        verificationCode:
          '2jEktbHKcZyvwjmtKpMFxp8OoFR4vLc24K6MJbrHyPlI5teMKhmI7qf70EULaduO',
        cnfPassword: null,
        privacyPolicyAgreed: false,
        termsAndConditionsAgreed: false,
        subscribedToNewsletter: false,
        countryCode: 'GB',
        gpMappings: [],
        token: null,
        active: true,
      },
    ];
    (auditService as any).usersListObs$ = of(usersList);
    component.createForm();
    component.getAllUsers();
    expect(component.usersList.length).toEqual(usersList.length);
  }));

  it('should call getAllUsers with filter', fakeAsync(() => {
    const usersList = [
      {
        ayvuId: '035f01aa-89c6-479d-8f39-56ebdbc0a958',
        userFirstName: 'Subhashini',
        userLastName: 'Garapati',
        nhsEmailId: 'subhashinigarapati@gmail.com',
        phoneNumber: '07464167962',
        username: 'Subhashini1',
        roleId: 1,
        roleName: 'Admin',
        verificationCode:
          '2jEktbHKcZyvwjmtKpMFxp8OoFR4vLc24K6MJbrHyPlI5teMKhmI7qf70EULaduO',
        cnfPassword: null,
        privacyPolicyAgreed: false,
        termsAndConditionsAgreed: false,
        subscribedToNewsletter: false,
        countryCode: 'GB',
        gpMappings: [],
        token: null,
        active: true,
      },
    ];
    (auditService as any).usersListObs$ = of(usersList);
    component.createForm();
    component.sentMessageAuditForm.get('userName').setValue('Subhashini1');
    component.getAllUsers();
    expect(component.usersList.length).toEqual(usersList.length);
  }));

  it('should check for valuechanges in form', fakeAsync(() => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    tick();
    expect(component.dataSource).toBeNull();

    component.sentMessageAuditForm.get('filterTimeLine').patchValue('today');
    tick();
    expect(component.toSearchFromDate).toBe(
      moment(new Date()).format('YYYY-MM-DD')
    );
    expect(component.isDateFilterValid).toBeTruthy();

    component.sentMessageAuditForm
      .get('filterTimeLine')
      .patchValue('yesterday');
    tick();
    expect(component.toSearchFromDate).toBe(
      moment(new Date().setDate(new Date().getDate() - 1)).format('YYYY-MM-DD')
    );
    expect(component.isDateFilterValid).toBeTruthy();

    component.sentMessageAuditForm.get('filterTimeLine').patchValue('week');
    tick();
    expect(component.toSearchFromDate).toBe(
      moment(new Date().setDate(new Date().getDate() - 6)).format('YYYY-MM-DD')
    );
    expect(component.isDateFilterValid).toBeTruthy();

    const frmDate =  moment(new Date()).format('YYYY-MM-DD');
    component.sentMessageAuditForm.get('fromDate').patchValue(frmDate);
    tick();
    expect(component.sentMessageAuditForm.get('filterTimeLine').value).toBe('');
    expect(component.toSearchFromDate).toBe(
      moment(new Date(frmDate)).format('YYYY-MM-DD')
    );
    expect(component.isDateFilterValid).toBeTruthy();

    const toDte =  moment(new Date()).format('YYYY-MM-DD');
    component.sentMessageAuditForm.get('toDate').patchValue(toDte);
    tick();
    expect(component.sentMessageAuditForm.get('filterTimeLine').value).toBe('');
    expect(component.toSearchToDate).toBe(
      moment(new Date(toDte)).format('YYYY-MM-DD')
    );
    expect(component.isDateFilterValid).toBeTruthy();
  }));

  it('should searchRecords with username and fromDate and toDate', () => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    component.sentMessageAuditForm
      .get('fromDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('toDate')
      .patchValue(moment(new Date()).format('YYYY-MM-DD'));
    component.sentMessageAuditForm
      .get('templateType')
      .patchValue('NEW_MESSAGE');
    component.sentMessageAuditForm.get('statusType').patchValue('SUCCESS');

    spyOn(auditService, 'smsSentBetweenDates')
      .and.returnValue(
        of({
          fromDate: 'Fri Nov 26 00:00:00 UTC 2021',
          toDate: 'Thu Dec 02 00:00:00 UTC 2021',
          userName: 'kuldeep',
          totalSmsSent: 5,
          smsStatusDto: [
            {
              id: 503,
              smsSid: 'SMd4560d92f1c14b3f9270172353eab1e6',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+447464867962',
              messageSid: null,
              smsFrom: 'KD5051',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nflue vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY. Please click the link to view the attachment: https://dev.ayuv.techvizglobal.co.uk/sms?fileId=2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              senderUserName: 'kuldeep',
              dateCreated: 1647317847000,
              dateSent: null,
              dateUpdated: 1647317847000,
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              allowResponse: false,
              responded: false,
            },
            {
              id: 504,
              smsSid: 'SMee355e19fbb3423388f9752bf5b9298d',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'kuldeep Please click the link to view the attachment: https://techviz-ayuv-dev-sms-attachments.s3.eu-west-1.amazonaws.com/45fb3448-47e2-4293-b957-1df07931975a.png\n\nPlease click the link to reply: Â§UI_DOMAINÂ§/form/default?id=153',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T18:02:41Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T18:02:41Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName:
                'https://techviz-ayuv-dev-sms-attachments.s3.eu-west-1.amazonaws.com/45fb3448-47e2-4293-b957-1df07931975a.png',
              allowResponse: true,
              responded: false,
            },
            {
              id: 505,
              smsSid: 'SM94c8a25408814a6381ef419a27f6e3de',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'kuldeep Please click the link to view the attachment: https://dev.backend.techvizglobal.co.uk/getMessageSMSImage/2010-10-22/false/79b59512-29c8-425d-b1e4-54f4e00e5e3e.png\n\nPlease click the link to reply: Â§UI_DOMAINÂ§/form/default?id=154',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T18:36:46Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T18:36:46Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '79b59512-29c8-425d-b1e4-54f4e00e5e3e.png',
              allowResponse: true,
              responded: false,
            },
            {
              id: 506,
              smsSid: 'SMdbd1cf1fc1b746d08f60904e394f3522',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nbooster vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY.',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T14:08:25Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T14:08:25Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: null,
              allowResponse: false,
              responded: false,
            },
            {
              id: 507,
              smsSid: 'SM02c3a86382994307883c25addcfe9e30',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nJitendar\n  dummy:http://www.nhs.uk \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY.\n\nPlease click the link to reply: https://dev.ayuv.techvizglobal.co.uk/form/default?id=155',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-27T13:55:28Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-27T13:55:28Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: null,
              allowResponse: true,
              responded: false,
            },
          ],
        })
      );
    component.searchRecords(0,10, sorting.active, sorting.direction);
    expect(auditService.smsSentBetweenDates).toHaveBeenCalled();
    expect(component.isDateFilterValid).toBeTruthy();
  });

  it('should not searchRecords', fakeAsync(() => {
    spyOn(auditService, 'smsSentBetweenDates')
      .withArgs(userName, fromDate, toDate, templateType, statusType,0,10, sorting.active, sorting.direction)
      .and.returnValue(
        of({
          fromDate: 'Fri Nov 26 00:00:00 UTC 2021',
          toDate: 'Thu Dec 02 00:00:00 UTC 2021',
          userName: 'kuldeep',
          totalSmsSent: 5,
          smsStatusDto: [
            {
              id: 503,
              smsSid: 'SMd4560d92f1c14b3f9270172353eab1e6',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+447464867962',
              messageSid: null,
              smsFrom: 'KD5051',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nflue vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY. Please click the link to view the attachment: https://dev.ayuv.techvizglobal.co.uk/sms?fileId=2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              senderUserName: 'kuldeep',
              dateCreated: 1647317847000,
              dateSent: null,
              dateUpdated: 1647317847000,
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              allowResponse: false,
              responded: false,
            },
            {
              id: 504,
              smsSid: 'SMee355e19fbb3423388f9752bf5b9298d',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'kuldeep Please click the link to view the attachment: https://techviz-ayuv-dev-sms-attachments.s3.eu-west-1.amazonaws.com/45fb3448-47e2-4293-b957-1df07931975a.png\n\nPlease click the link to reply: Â§UI_DOMAINÂ§/form/default?id=153',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T18:02:41Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T18:02:41Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName:
                'https://techviz-ayuv-dev-sms-attachments.s3.eu-west-1.amazonaws.com/45fb3448-47e2-4293-b957-1df07931975a.png',
              allowResponse: true,
              responded: false,
            },
            {
              id: 505,
              smsSid: 'SM94c8a25408814a6381ef419a27f6e3de',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'kuldeep Please click the link to view the attachment: https://dev.backend.techvizglobal.co.uk/getMessageSMSImage/2010-10-22/false/79b59512-29c8-425d-b1e4-54f4e00e5e3e.png\n\nPlease click the link to reply: Â§UI_DOMAINÂ§/form/default?id=154',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T18:36:46Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T18:36:46Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '79b59512-29c8-425d-b1e4-54f4e00e5e3e.png',
              allowResponse: true,
              responded: false,
            },
            {
              id: 506,
              smsSid: 'SMdbd1cf1fc1b746d08f60904e394f3522',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nbooster vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY.',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T14:08:25Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T14:08:25Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: null,
              allowResponse: false,
              responded: false,
            },
            {
              id: 507,
              smsSid: 'SM02c3a86382994307883c25addcfe9e30',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nJitendar\n  dummy:http://www.nhs.uk \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY.\n\nPlease click the link to reply: https://dev.ayuv.techvizglobal.co.uk/form/default?id=155',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-27T13:55:28Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-27T13:55:28Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: null,
              allowResponse: true,
              responded: false,
            },
          ],
        })
      );
    component.sentMessageAuditForm.get('userName').patchValue('');
    component.searchRecords(0,10, sorting.active, sorting.direction);
    tick();
    expect(auditService.smsSentBetweenDates).not.toHaveBeenCalled();
    expect(component.isDateFilterValid).toBeFalsy();
    flush();
  }));

  it('should searchRecords with username and filterTimeLine', fakeAsync(() => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    component.sentMessageAuditForm.get('filterTimeLine').patchValue('today');
    component.sentMessageAuditForm
      .get('templateType')
      .patchValue('NEW_MESSAGE');
    component.sentMessageAuditForm.get('statusType').patchValue('SUCCESS');
    spyOn(auditService, 'smsSentBetweenDates')
      .withArgs(userName, fromDate, toDate, templateType, statusType,0,10, sorting.active, sorting.direction)
      .and.returnValue(
        of({
          fromDate: 'Fri Nov 26 00:00:00 UTC 2021',
          toDate: 'Thu Dec 02 00:00:00 UTC 2021',
          userName: 'kuldeep',
          totalSmsSent: 5,
          smsStatusDto: [
            {
              id: 503,
              smsSid: 'SMd4560d92f1c14b3f9270172353eab1e6',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+447464867962',
              messageSid: null,
              smsFrom: 'KD5051',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nflue vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY. Please click the link to view the attachment: https://dev.ayuv.techvizglobal.co.uk/sms?fileId=2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              senderUserName: 'kuldeep',
              dateCreated: 1647317847000,
              dateSent: null,
              dateUpdated: 1647317847000,
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '2ffcaa6a-5642-4445-9b81-cf53a349fd88.png',
              allowResponse: false,
              responded: false,
            },
            {
              id: 504,
              smsSid: 'SMee355e19fbb3423388f9752bf5b9298d',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'kuldeep Please click the link to view the attachment: https://techviz-ayuv-dev-sms-attachments.s3.eu-west-1.amazonaws.com/45fb3448-47e2-4293-b957-1df07931975a.png\n\nPlease click the link to reply: Â§UI_DOMAINÂ§/form/default?id=153',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T18:02:41Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T18:02:41Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName:
                'https://techviz-ayuv-dev-sms-attachments.s3.eu-west-1.amazonaws.com/45fb3448-47e2-4293-b957-1df07931975a.png',
              allowResponse: true,
              responded: false,
            },
            {
              id: 505,
              smsSid: 'SM94c8a25408814a6381ef419a27f6e3de',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'kuldeep Please click the link to view the attachment: https://dev.backend.techvizglobal.co.uk/getMessageSMSImage/2010-10-22/false/79b59512-29c8-425d-b1e4-54f4e00e5e3e.png\n\nPlease click the link to reply: Â§UI_DOMAINÂ§/form/default?id=154',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T18:36:46Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T18:36:46Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: '79b59512-29c8-425d-b1e4-54f4e00e5e3e.png',
              allowResponse: true,
              responded: false,
            },
            {
              id: 506,
              smsSid: 'SMdbd1cf1fc1b746d08f60904e394f3522',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nbooster vaccine\n   \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY.',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-26T14:08:25Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-26T14:08:25Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: null,
              allowResponse: false,
              responded: false,
            },
            {
              id: 507,
              smsSid: 'SM02c3a86382994307883c25addcfe9e30',
              smsStatus: null,
              messageStatus: null,
              smsTo: '+919887729374',
              messageSid: null,
              smsFrom: '+447782812577',
              apiVersion: '2010-04-01',
              accountSid: 'ACd256085d2ec38305fc59e00429a469e8',
              message:
                'Dear Mrs Jane Smith, \nJitendar\n  dummy:http://www.nhs.uk \n Thanks,\nkuldeep,\n THE DENSHAM SURGERY.\n\nPlease click the link to reply: https://dev.ayuv.techvizglobal.co.uk/form/default?id=155',
              senderUserName: 'kuldeep',
              dateCreated: '2021-11-27T13:55:28Z[Etc/UTC]',
              dateSent: null,
              dateUpdated: '2021-11-27T13:55:28Z[Etc/UTC]',
              errorMessage: null,
              errorCode: 0,
              nhsNumber: '9449305552',
              templateId: '1',
              templateType: 'Text Message',
              templateUrl: null,
              roomURL: null,
              imageName: null,
              allowResponse: true,
              responded: false,
            },
          ],
        })
      );
    component.searchRecords(0,10, sorting.active, sorting.direction);
    tick();
    expect(auditService.smsSentBetweenDates).toHaveBeenCalled();
    expect(component.isDateFilterValid).toBeTruthy();
    flush();
  }));

  it('should searchRecords with username and filterTimeLine and No Data Found', fakeAsync(() => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    component.sentMessageAuditForm.get('filterTimeLine').patchValue('today');
    component.sentMessageAuditForm
      .get('templateType')
      .patchValue('NEW_MESSAGE');
    component.sentMessageAuditForm.get('statusType').patchValue('SUCCESS');
    spyOn(auditService, 'smsSentBetweenDates')
      .withArgs(userName, fromDate, toDate, templateType, statusType,0,10, sorting.active, sorting.direction)
      .and.returnValue(of({}));
    component.searchRecords(0,10, sorting.active, sorting.direction);
    tick();
    expect(component.isDateFilterValid).toBeTruthy();
    expect(auditService.smsSentBetweenDates).toHaveBeenCalled();
    expect(component.dataSource?.data).toEqual([]);
    flush();
  }));

  it('should searchRecords with download file', fakeAsync(() => {
    component.sentMessageAuditForm.get('userName').patchValue({username:'Jitendar'});
    component.sentMessageAuditForm.get('filterTimeLine').patchValue('today');
    component.sentMessageAuditForm
      .get('templateType')
      .patchValue('NEW_MESSAGE');
    component.sentMessageAuditForm.get('statusType').patchValue('SUCCESS');
    spyOn(auditService, 'smsSentBetweenDates')
      .and.returnValue(of({"fromDate":"Sat Mar 05 00:00:00 GMT 2022",
      "toDate":"Sat Mar 12 00:00:00 GMT 2022","userName":"hanishuser",
      "totalSmsSent":2,"totalElement":2,"totalPages":1,
      "smsStatusDto":[{"id":4505,"smsSid":null,"smsStatus":"SUCCESS","messageStatus":"FAIL",
      "smsTo":"01632960587","messageSid":null,"smsFrom":"Ayuv Message Service","apiVersion":null,
      "accountSid":null,
      "message":"Dear Mrs Jane Smith",
      "senderUserName":"hanishuser","dateCreated":1646863803000,
      "dateSent":1646863804000,"dateUpdated":null,"errorMessage":null,
      "errorCode":0,"nhsNumber":"9449305552","templateId":null,"templateType":"SCHEDULE_MSG",
      "templateUrl":null,"roomURL":null,"imageName":null,"allowResponse":false,"senderType":"SURGERY",
      "bulkMessageId":null,"responded":false},{"id":4473,"smsSid":"SM648db7564d6f4f4b9ae6a2908468a1d4",
      "smsStatus":"SUCCESS","messageStatus":"queued","smsTo":"+447702752028","messageSid":null,"smsFrom":"AYUV",
      "apiVersion":"2010-04-01","accountSid":"ACd256085d2ec38305fc59e00429a469e8",
      "message":"Dear Mrs Jane Smith","senderUserName":"hanishuser",
      "dateCreated":1646758801000,"dateSent":1646758802000,"dateUpdated":1646758801000,
      "errorMessage":null,"errorCode":0,"nhsNumber":"9449305552","templateId":null,
      "templateType":"SCHEDULE_MSG","templateUrl":null,"roomURL":null,"imageName":null,"allowResponse":false,
      "senderType":"SURGERY","bulkMessageId":null,"responded":false}]}));

      const spyObj = jasmine.createSpyObj('a', ['click', 'style']);
      spyOn(document, 'createElement').and.returnValue(spyObj);
      spyOn(document.body, 'appendChild');
      spyOn(document.body, 'removeChild');
      component.searchRecords(0,10, sorting.active, sorting.direction, true);
      tick();
      expect(component.isDateFilterValid).toBeTruthy();
      expect(auditService.smsSentBetweenDates).toHaveBeenCalled();
      flush();
  }));

  it('should clear', fakeAsync(() => {
    spyOn(component, 'clear').and.callThrough();
    fixture.nativeElement.querySelector('#clearButton').click();
    tick();
    expect(component.clear).toHaveBeenCalled();
    expect(component.dataSource).toBeNull();
  }));

  it('should selectedTabIndex', fakeAsync(() => {
    spyOn(component, 'clear').and.callThrough();
    tick();
    component.selectedTabIndex = 1;
    expect(component.clear).toHaveBeenCalled();
  }));
});
