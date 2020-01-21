import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAdjustmentComponent } from './asset-adjustment.component';

describe('AssetAdjustmentComponent', () => {
  let component: AssetAdjustmentComponent;
  let fixture: ComponentFixture<AssetAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
