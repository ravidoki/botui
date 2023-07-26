import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AuditService } from './audit.service';

describe('AuditService', () => {
  let httpMock: HttpTestingController;
  let auditService: AuditService;
  const userName = 'Jitendar';
  const fromDate = new Date().toISOString().slice(0, 10);
  const toDate = new Date().toISOString().slice(0, 10);
  const templateType = 'NEW_MESSAGE';
  const statusType = 'SUCCESS';
  const sorting = { active:'lastModifiedDate', direction: 'desc'}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    auditService = TestBed.inject(AuditService);
  });

  it('should be created', () => {
    expect(auditService).toBeTruthy();
  });

  it('smsSentBetweenDates() should GET messages audit data', () => {
    auditService.smsSentBetweenDates(userName, fromDate, toDate, templateType, statusType,0,10, sorting.active, sorting.direction).subscribe((res) => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne(`${environment.baseUrl}/smsSentBetweenDates?userName=${userName}&fromDate=${fromDate}&toDate=${toDate}&templateType=${templateType}&successOrFail=${statusType}&offset=0&pageSize=10&sortBy=${sorting.active}&sortType=${sorting.direction}`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
    httpMock.verify();
  });

  it('auditReport() should GET  user audit data', () => {
    auditService.auditReport(userName, fromDate, toDate,0,10, sorting.active, sorting.direction).subscribe((res) => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne(`${environment.baseUrl}/auditReportByUser?userName=${userName}&fromDate=${fromDate}&toDate=${toDate}&offset=0&pageSize=10&sortBy=${sorting.active}&sortType=${sorting.direction}`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
    httpMock.verify();
  });

  it('getTemplateType() should GET  Template types', () => {
    auditService.getTemplateType().subscribe((res) => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne(`${environment.baseUrl}/getTemplateType`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
    httpMock.verify();
  });
});


