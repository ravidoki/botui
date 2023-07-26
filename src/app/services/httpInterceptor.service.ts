import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import * as CryptoJS from 'crypto-js';
import { finalize } from "rxjs/operators";
import { Router } from '@angular/router';
import { UtilService } from './util.service';
import { SurgeryMappings } from '../models/UserLogin';
import {map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {


    allowedStatusCodesWithoutSnackBarMessage: number[] = [1]
    surgeryId: string;
    private numberOfActiveRequests=0;

    constructor(private authenticationService: AuthService,
        private utilService: UtilService,
        private router: Router) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            localStorage.clear();
            this.router.navigateByUrl(`/login`);
            return of(err.error && err.error.message);
        }
        this.utilService.openSnackBar(err.error && err.error.message || 'Something Went Wrong!', 'Error', 'error');
        return of(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.setLoader();
        this.numberOfActiveRequests++;
        return this.handleRequest(next, req);
    }


    handleRequest(next, authReq) {
        return next.handle(authReq).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    event = event.clone({ body: this.modifyBody(event.body) });
                }
                return event;
            }),
            catchError(x => this.handleAuthError(x)),
            finalize(() => {
                this.numberOfActiveRequests--;
                if(this.numberOfActiveRequests===0){this.stopLoader()}})
        );
    }

    setLoader() {
        this.authenticationService.isLoadingSubject.next(true);
    }
    stopLoader() {
        this.authenticationService.isLoadingSubject.next(false);
    }

    modifyBody(responseBody) {
        if (Object.keys(responseBody).includes('statusCode')) {
            if (this.allowedStatusCodesWithoutSnackBarMessage.includes(responseBody.statusCode)) {
                return responseBody;
            }
            if (responseBody.statusCode === 0) {
                return responseBody.data || responseBody;
            } else if (responseBody.statusCode === 101) {
                this.utilService.openSnackBar(responseBody.message, 'Success', 'success');
                return responseBody;
            } else {
                this.utilService.openSnackBar(responseBody.message, 'Error', 'error');
                return responseBody;
            }
        }
        return responseBody;
    }
}
