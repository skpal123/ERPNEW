import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSalaryItemComponent } from './grade-salary-item.component';

describe('GradeSalaryItemComponent', () => {
  let component: GradeSalaryItemComponent;
  let fixture: ComponentFixture<GradeSalaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeSalaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeSalaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
