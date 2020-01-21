import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SepecificCustomerTransactionEntryComponent } from './sepecific-customer-transaction-entry.component';

describe('SepecificCustomerTransactionEntryComponent', () => {
  let component: SepecificCustomerTransactionEntryComponent;
  let fixture: ComponentFixture<SepecificCustomerTransactionEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SepecificCustomerTransactionEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SepecificCustomerTransactionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
