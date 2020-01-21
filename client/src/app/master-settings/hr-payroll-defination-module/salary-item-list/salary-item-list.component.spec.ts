import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryItemListComponent } from './salary-item-list.component';

describe('SalaryItemListComponent', () => {
  let component: SalaryItemListComponent;
  let fixture: ComponentFixture<SalaryItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
