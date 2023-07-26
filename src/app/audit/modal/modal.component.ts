import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DatePipe } from "@angular/common";
import * as xls from 'xlsx'
export interface PatientDetails {
  Id: string;
  Name: number;
  Email: number;
  MobileNo: string;

  state: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit ,OnDestroy {

  closeResult = '';
  displayedColumns: string[] = [];
  sorting = {active: 'lastModifiedDate', direction: 'desc'}
  dataSource: MatTableDataSource<PatientDetails>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("table",{ read: ElementRef }) table!: ElementRef;
  pageIndex = 0;
  length = 0;
  pageSize = 10;

  ngOnInit() {
    this.displayedColumns = ['id', 'name', 'email', 'mobile', 'state'];
  }

  ngOnDestroy() {
    this.dataSource = null;
    this.paginator.pageSize = 10;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData, private datePipe: DatePipe) {
    this.dataSource = this.dialogData?.dataSource;
    this.length = this.dataSource.data.length;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  matSortChange(event) {
    this.sorting.active = event.active;
    this.sorting.direction = event.direction;
    if (this.dataSource?.data?.length) {
      this.paginator.pageIndex = 0;
    }

    if (!event.active || event.direction === '') {
      return;
    }

    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
          return this.compare(a.Id, b.Id, isAsc);
        case 'name':
          return this.compare(a.Name, b.Name, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  exportCSV() {
    const ws: xls.WorkSheet = xls.utils.json_to_sheet(this.dataSource.data);

    const wb: xls.WorkBook = xls.utils.book_new();
    xls.utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    xls.writeFile(wb, "userData.xlsx");
  }

  printData() {
    window.print();
  }

  emailData() {
    window.print();
  }

  pageChangeEvent(pageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
  }


}
