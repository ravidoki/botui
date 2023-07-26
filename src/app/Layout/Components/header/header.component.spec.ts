import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { UtilService } from 'src/app/services/util.service';
import { HeaderComponent } from './header.component';
import { ThemeOptions } from 'src/app/theme-options';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockUtilService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockThemeOptions = {
    toggleSidebarMobile: jasmine.createSpy('toggleSidebarMobile'),
    toggleHeaderMobile:  jasmine.createSpy('toggleHeaderMobile')
  }
  let mockDashboardService;
  let user = {
    user: 
    {
      authorities: [
      {
        authority : 'SuperAdmin'
      }
    ]
  }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        CommonModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers: [
         UtilService,

         {provide: ThemeOptions, useValue: mockThemeOptions},
         { provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    mockUtilService = TestBed.inject(UtilService);
    component = fixture.componentInstance;
  });


 });
