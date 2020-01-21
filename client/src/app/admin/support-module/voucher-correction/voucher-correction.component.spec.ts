import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherCorrectionComponent } from './voucher-correction.component';

describe('VoucherCorrectionComponent', () => {
  let component: VoucherCorrectionComponent;
  let fixture: ComponentFixture<VoucherCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
