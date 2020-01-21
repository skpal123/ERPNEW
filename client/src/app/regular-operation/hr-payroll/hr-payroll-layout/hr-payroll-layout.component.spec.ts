import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPayrollLayoutComponent } from './hr-payroll-layout.component';

describe('HrPayrollLayoutComponent', () => {
  let component: HrPayrollLayoutComponent;
  let fixture: ComponentFixture<HrPayrollLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPayrollLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPayrollLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
