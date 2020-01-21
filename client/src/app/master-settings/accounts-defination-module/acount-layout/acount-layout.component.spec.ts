import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountLayoutComponent } from './acount-layout.component';

describe('AcountLayoutComponent', () => {
  let component: AcountLayoutComponent;
  let fixture: ComponentFixture<AcountLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcountLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcountLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
