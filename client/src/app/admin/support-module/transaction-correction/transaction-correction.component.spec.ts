import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCorrectionComponent } from './transaction-correction.component';

describe('TransactionCorrectionComponent', () => {
  let component: TransactionCorrectionComponent;
  let fixture: ComponentFixture<TransactionCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
