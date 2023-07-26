
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { AccessModifierService } from 'src/app/services/accessModifier.service';
import { AuditService } from 'src/app/services/audit.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { AuditHomeComponent } from './audit-home.component';
import { of } from 'rxjs';

describe('AuditHomeComponent', () => {
    let component: AuditHomeComponent;
    let fixture: ComponentFixture<AuditHomeComponent>;
    let mockAccessModifierService;
    let mockUserService;
    let mockAuditService;
    const accessModifier = {
        isVisible: true,
        isEditable: true,
        moduleName: ""
    }
    const componentList = [{
        "id": 57,
        "surgeryId": 1,
        "accessTypeCode": "WRITE",
        "moduleCode": "ADMIN_USER",
        "roleId": 4
    },
    {
        "id": 58,
        "surgeryId": 1,
        "accessTypeCode": "WRITE",
        "moduleCode": "DELETED_USER",
        "roleId": 4
    }];

    beforeEach( () => {
         TestBed.configureTestingModule({
            declarations: [AuditHomeComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [AccessModifierService, UtilService],
            imports: [MaterialModule, HttpClientTestingModule, RouterTestingModule.withRoutes(
                [{
                   path: 'home/auditHome/message',
                   component: BlankComponent
                },
                {
                    path: 'home/auditHome/user',
                    component: BlankComponent
                }]
             )]
        });
    });


        beforeEach( () => {
            fixture = TestBed.createComponent(AuditHomeComponent);
            mockAccessModifierService = TestBed.inject(AccessModifierService); 
            mockUserService = TestBed.inject(UserService);  
            mockAuditService = TestBed.inject(AuditService);    
            component = fixture.componentInstance;
            fixture.whenStable();
        });

        it('should call ngOnInIt', () => {
            let userList = [{
                username: 'userName',
                roleId: 1,
                roleName: 'roleName'
            }];
            spyOn(mockUserService,'getUsers').and.returnValue(of(userList));
            spyOn(mockAuditService,'setUsersList');
            spyOn(mockAccessModifierService,'menuEnableComponents').and.returnValue(componentList);
            component.ngOnInit();
            expect(component).toBeDefined();
            expect(component.componentList.length).toEqual(componentList.length);
            expect(mockAccessModifierService.menuEnableComponents).toHaveBeenCalled();
            expect(mockUserService.getUsers).toHaveBeenCalled();
            expect(mockAuditService.setUsersList).toHaveBeenCalled();
        });

        it('should call isComponentExist method', () => {
            component.componentList = componentList;
            var res = component.isComponentExist("ADMIN_USER");
            expect(res).toBeTruthy();
        });      

        it('should be created', () => {
            expect(component).toBeDefined();
        });

        it('accessModifiers should have values', async () => {
            component.accessModifiers = accessModifier;
            expect(component.accessModifiers).toEqual(accessModifier);
        });

        it('on Tab click', fakeAsync(() => {
            const event = { index: 0 };
            component.onTabClick(event);
            expect(component.selectedTabIndex).toBe(0);
        }));

        it('on Tab Change', fakeAsync(() => {
            const event = { index: 1 };
            component.onTabClick(event);
            expect(component.selectedTabIndex).toBe(1);
        }));

});

@Component({
    selector: 'app-blank',
    template: ''
  })
  export class BlankComponent {
  
  }