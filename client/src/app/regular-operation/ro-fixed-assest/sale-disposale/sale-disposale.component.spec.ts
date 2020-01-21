import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDisposaleComponent } from './sale-disposale.component';

describe('SaleDisposaleComponent', () => {
  let component: SaleDisposaleComponent;
  let fixture: ComponentFixture<SaleDisposaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleDisposaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDisposaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
