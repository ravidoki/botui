import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAudit } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  base_url = `${environment.baseUrl}`;
  constructor(
    private httpClient: HttpClient,
  ) {
  }


  smsSentBetweenDates(userName, fromDate, toDate, templateType, successOrFail) {
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    params = params.append('templateType', templateType);
    params = params.append('successOrFail', successOrFail);

    return this.httpClient.get(`${this.base_url}/smsSentBetweenDates`, { params });
  }

  // getMsgByGP(surgeryId) {
  //   let params = new HttpParams();
  //   params = params.append('surgeryId', surgeryId);

  //   return this.httpClient.get<Message[]>(`${this.base_url}/getAllTemplateMessagesByGP`, { headers: this.headers });
  // }

  // public getMsgOne(id: string) {

  //   return this.httpClient.get<Message[]>(`${this.base_url}/getAyvuTemplateMessage/${id}`, { headers: this.headers });
  // }


  // public DeleteMsg(msg: Message) {
  //   return this.httpClient.delete<Message>(`${this.base_url}/deleteAyvuTemplateMessage/${msg.mtsID}`, { headers: this.headers });
  // }

  // public CreateMsg(msg: AyuvMessage): Observable<AyuvMessage> {
  //   return this.httpClient.post<AyuvMessage>(`${this.base_url}/createSingleMessageTemplate`, msg, { headers: this.headers });
  // }

  // public UpdateMessage(msg: Message): Observable<Message> {
  //   return this.httpClient.put<Message>(`${this.base_url}/updateAyvuTemplateMessage/${msg.mtsID}`, msg, { headers: this.headers });
  // }

  // sendMsg() {
  //   return this.httpClient.get(`${this.base_url}/sendSingleMessageTemplateToSMS`, { headers: this.headers });
  // }

  auditReport(userName, fromDate, toDate): Observable<UserAudit[]> {
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('fromDate', fromDate);
    params = params.append('toDate', toDate);
    return this.httpClient.get<UserAudit[]>(`${this.base_url}/auditReportByUser`, { params });
  }

  // videoReport(userName, fromDate, toDate, successOrFail) {
  //   let params = new HttpParams();
  //   params = params.append('userName', userName);
  //   params = params.append('fromDate', fromDate);
  //   params = params.append('toDate', toDate);
  //   params = params.append('successOrFail', successOrFail);

  //   return this.httpClient.get(`${this.base_url}/getVideoCallReport`, { params });
  // }

  getTemplateType() {
      return this.httpClient.get(`${this.base_url}/api/getTemplateType`);
  }
}
