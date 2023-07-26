import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SurgeryMappings } from 'src/app/models/UserLogin';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<SurgeryMappings>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  generalPractice: SurgeryMappings[];

  subscriptions:Subscription = new Subscription();
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log("");
  }








  
  sortData()
  {
    this.paginator.pageIndex = 0;
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

}
