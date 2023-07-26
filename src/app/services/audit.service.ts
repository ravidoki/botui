import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuditService {

  usersList = new Subject();
  usersListObs$ = this.usersList.asObservable();

  baseUrl = `http://localhost:3000`;

  constructor(private httpClient: HttpClient) { }

  smsSentBetweenDates(userName, fromDate, toDate, templateType, successOrFail, offset, pageSize, sortBy, sortType) {
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('templateType', templateType);
    params = params.append('successOrFail', successOrFail);
    params = params.append('offset', offset);
    params = params.append('pageSize', pageSize);
    params = params.append('sortBy', sortBy);
    params = params.append('sortType', sortType);
    return this.httpClient.get(`${this.baseUrl}/absent/`, );
  }

  auditReport(userName, fromDate, toDate, offset, pageSize, sortBy, sortType): Observable<any> {
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('offset', offset);
    params = params.append('pageSize', pageSize);
    params = params.append('sortBy', sortBy);
    params = params.append('sortType', sortType);
    return this.httpClient.get<any>(`${this.baseUrl}/auditReportByUser`, { params });
  }

}
