import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
describe('UserService', () => {
  let httpMock: HttpTestingController;
  let userService: UserService;
  beforeEach(() => {
   TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ UserService ]
   });

   userService = TestBed.inject(UserService);
   httpMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  it('getAyuvUser() should GET Users', () => {
    userService.getAyuvUser().subscribe((res) => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne(`${environment.baseUrl}/getAllUsers`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
    httpMock.verify();
  });
});
