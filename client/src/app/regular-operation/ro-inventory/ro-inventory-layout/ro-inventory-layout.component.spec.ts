import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoInventoryLayoutComponent } from './ro-inventory-layout.component';

describe('RoInventoryLayoutComponent', () => {
  let component: RoInventoryLayoutComponent;
  let fixture: ComponentFixture<RoInventoryLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoInventoryLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoInventoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
