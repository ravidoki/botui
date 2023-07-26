import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UtilService } from 'src/app/services/util.service';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardModule } from '../dashboard.module';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SurgeryMappings } from 'src/app/models/UserLogin';
import { RoleAccessService } from 'src/app/services/roleAccess.service';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockUtilService;
  let mockDashboardService;
  let mockRoleAccessService;
  const res: SurgeryMappings[] =  [{
    surgery: {
      id: 1,
      code: 'A81001',
      name: 'THE DENSHAM SURGERY',
      aliasName: 'COXHOE1',
      addressLine1: 'THE HEALTH CENTRE',
      addressLine2: 'LAWSON STREET',
      addressLine3: 'STOCKTON-ON-TEES',
      addressLine4: 'CLEVELAND',
      addressLine5: '\n',
      postcode: 'TS18 1HU',
      contactTelephone: '01642 672351',
      openDate: '19740401'
    },
    registrationStatus: 'Approved'
  }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        DashboardRoutingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        CommonModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        DashboardModule
      ],
      providers: [
         MatDialog,
         UtilService,
         DashboardService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    mockUtilService = TestBed.inject(UtilService);
    mockDashboardService = TestBed.inject(DashboardService);
    mockRoleAccessService = TestBed.inject(RoleAccessService);
    component = fixture.componentInstance;
    spyOn(mockUtilService, 'getSelectedSurgery').and.returnValue(of(res));
    spyOn(mockUtilService, 'isUserLogin').and.returnValue(true);
  });


});
