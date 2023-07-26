import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  getQuestionOptions(patientId) {
    return this.http.get(`${environment.baseUrl}/getQuestionOptions?patientRespId=${patientId}`);
   }

   savePatientResponse(data) {
    return this.http.post(`${environment.baseUrl}/patientResponse`, data);
   }

   validatePatient(data) {
   let url =`${environment.baseUrl}/validatePatientInfo?dob=${data.dob}&lastName=${data.lastName}`;
     if (data.nhsNumber) {
       url += `&nhsNumber=${data.nhsNumber}`;
     } else {
       url += `&formId=${data.formId}`;
     }
    return this.http.get(url, data);
   }

   getMessageSMSImage(imageName) {
    return this.http.get(`${environment.baseUrl}/getMessageSMSImage/${true}/${imageName}`, {responseType: "blob"});
   }
   
   uploadAttachment(data) {
    return this.http.post(`${environment.baseUrl}/uploadAttachment`, data);

   }
}



