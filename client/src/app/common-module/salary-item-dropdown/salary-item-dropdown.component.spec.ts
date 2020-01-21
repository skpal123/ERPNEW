import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryItemDropdownComponent } from './salary-item-dropdown.component';

describe('SalaryItemDropdownComponent', () => {
  let component: SalaryItemDropdownComponent;
  let fixture: ComponentFixture<SalaryItemDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryItemDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryItemDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
