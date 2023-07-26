import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserAudit, UserAyuv } from 'src/app/models/user';
import { UtilService } from 'src/app/services/util.service';
import { Observable,Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuditService } from 'src/app/services/audit.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DateRangeValidators } from 'src/app/Shared/date-range.validators';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-messages-audit',
  templateUrl: './messages-audit.component.html',
  styleUrls: ['./messages-audit.component.scss']
})
export class MessagesAuditComponent implements OnInit ,OnDestroy{
  usersList: UserAyuv[] = [];
  templateType: { key: string, value: string }[] = [];
  successOrFail: { key: string, value: string }[] = [];
  dataSource: MatTableDataSource<UserAudit>;
  displayedColumns: string[] = [];
  maxDate: Date = new Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @Input()
  public set selectedTabIndex(val: number) {
    if (val === 1) {
      this.clear();
    }
  }
  messagesLength=0;
  templateTypeMap: any;
  sentMessageAuditForm: FormGroup;
  isDateFilterValid = true;
  toSearchToDate: any;
  toSearchFromDate: any;
  userNameList$: Observable<any>;

  sorting = { active:'lastModifiedDate', direction: 'desc'}
  subscriptions:Subscription = new Subscription();
  constructor(
    private auditService: AuditService,
    private fb: FormBuilder,
    private utilService: UtilService, private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.createForm();
    this.displayedColumns = ['firstName', 'lastName',  'formName', 'relationship', 'parent'];
    this.successOrFail = [{ key: "FAIL", value:"Fail"},
      { key: "SUCCESS", value:"Success"}];

    this.subscriptions.add(this.sentMessageAuditForm.valueChanges.subscribe(() => {
      this.dataSource = null;
      this.sorting.active='lastModifiedDate';
      this.sorting.direction='desc';
    }));


    this.subscriptions.add(this.sentMessageAuditForm.get('filterTimeLine').valueChanges.subscribe((filterTimeLineChanges: string) => {
      this.isDateFilterValid = true;
      if (filterTimeLineChanges) {
        this.sentMessageAuditForm.get('fromDate').patchValue('');
        this.sentMessageAuditForm.get('toDate').patchValue('');
        this.toSearchToDate = moment(new Date()).format('YYYY-MM-DD');
        switch (filterTimeLineChanges) {
          case 'today':
            this.toSearchFromDate = this.toSearchToDate;
            break;
          case 'yesterday':
            this.toSearchFromDate = moment(new Date().setDate(new Date().getDate() - 1)).format('YYYY-MM-DD');
            break;
          case 'week':
            this.toSearchFromDate = moment(new Date().setDate(new Date().getDate() - 6)).format('YYYY-MM-DD');
            break;
        }
      }
    }));

    this.subscriptions.add(this.sentMessageAuditForm.get('fromDate').valueChanges.subscribe((fromDateChanges: string) => {
      this.isDateFilterValid = true;
      if (fromDateChanges) {
        this.sentMessageAuditForm.get('filterTimeLine').patchValue('');
        this.toSearchFromDate = moment(fromDateChanges).format('YYYY-MM-DD')
      }
    }));

    this.subscriptions.add(this.sentMessageAuditForm.get('toDate').valueChanges.subscribe((toDateChanges: string) => {
      this.isDateFilterValid = true;
      if (toDateChanges) {
        this.sentMessageAuditForm.get('filterTimeLine').patchValue('');
        this.toSearchToDate = moment(toDateChanges).format('YYYY-MM-DD')
      }
    }));

  }


  createForm(): void {
    this.sentMessageAuditForm = this.fb.group({
      fromDate: [{ value: ''}],
      toDate: [{ value: '' }],
      filterTimeLine: [{ value: '' }]
    },{ validator: [
      DateRangeValidators.fromToDate('fromDate', 'toDate')
    ]} as AbstractControlOptions);
  }



  searchRecords(offset, pageSize, sortBy, sortType, isDownload?): void {
    const fromDateControl = this.sentMessageAuditForm.controls.fromDate;
    const toDateControl = this.sentMessageAuditForm.controls.toDate;
    const filterTimeLineControl = this.sentMessageAuditForm.controls.filterTimeLine;
    this.isDateFilterValid = false;
    if (filterTimeLineControl.value||(toDateControl.value && fromDateControl.value)) {
      this.isDateFilterValid = true;
    }
    if (this.sentMessageAuditForm.valid && this.isDateFilterValid) {
      this.auditService.smsSentBetweenDates("",
        this.toSearchFromDate,
        this.toSearchToDate,
        "",
        "", offset, pageSize, sortBy, sortType).subscribe(
          (res: any) => {
            if (res?.data?.length) {
              this.handleResponseData(res, isDownload); 
            } else {
              this.utilService.openSnackBar('No data available', 'Success', `success`);
              this.dataSource = new MatTableDataSource([]);
            }
          }
        );
    } else {
      this.utilService.validateAllFormFields(this.sentMessageAuditForm);
    }
  }

  clear() {
    this.dataSource = null;
    this.paginator.pageSize=10;
    this.messagesLength=0;
    this.formGroupDirective.resetForm();
  }

  pageChangeEvent(pageEvent){
    this.searchRecords(pageEvent.pageIndex,pageEvent.pageSize, this.sorting.active, this.sorting.direction);
  }

  matSortChange(event) {
    this.sorting.active=event.active;
    this.sorting.direction=event.direction;
    if(this.dataSource?.data?.length)
    {
      this.paginator.pageIndex = 0;
      this.searchRecords(0,10, event.active, event.direction);
    }
  }


  downloadResults() {
    this.searchRecords(0,2147483647, this.sorting.active, this.sorting.direction, true);
  }

  handleResponseData(res, isDownload) {
    if(isDownload) {
      this.downloadFile(res?.smsStatusDto,this.sentMessageAuditForm.get('userName').value?.username+'_Messages_Audit_Report' );
    } else {
      this.dataSource = new MatTableDataSource(res?.data);
      this.messagesLength = res?.totalElement;
    }
  }
  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in headerList) {
     row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
     let line = (i+1)+'';
     for (let index in headerList) {
      let head = headerList[index];
      if(head ==='dateUpdated') {
        let value;
        if(array[i][head]) {
          value =this.datePipe.transform(new Date(array[i][head]),"dd/MM/yy h:mm a");
        } else {
         value = 'NA'
        }
        line += ',' + '"' + value + '"';
       } else {
      line += ',' + '"'+array[i][head]+'"';
      }
     }
     str += line + '\r\n';
    }
    return str;
   }

downloadFile(data, filename='data') {
  let csvData = this.ConvertToCSV(data,['templateType', 'dateUpdated',  'message', 'smsFrom', 'smsTo', 'smsStatus']);
  let dwldLink = document.createElement("a");
  let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
  if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.target = "_blank";
  }
  dwldLink.href ='data:text/csv;charset=utf-8,'+escape(csvData);
  dwldLink.download = filename + ".csv";
  dwldLink.style.visibility = "hidden";
  document.body.appendChild(dwldLink);
  dwldLink.click();
  document.body.removeChild(dwldLink);
}
  
ngOnDestroy() {
  this.subscriptions?.unsubscribe();
}
}
