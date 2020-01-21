import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SepecificSupplierTransactionEntryComponent } from './sepecific-supplier-transaction-entry.component';

describe('SepecificSupplierTransactionEntryComponent', () => {
  let component: SepecificSupplierTransactionEntryComponent;
  let fixture: ComponentFixture<SepecificSupplierTransactionEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SepecificSupplierTransactionEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SepecificSupplierTransactionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
