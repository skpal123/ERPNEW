import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoFixedAssetLayoutComponent } from './ro-fixed-asset-layout.component';

describe('RoFixedAssetLayoutComponent', () => {
  let component: RoFixedAssetLayoutComponent;
  let fixture: ComponentFixture<RoFixedAssetLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoFixedAssetLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoFixedAssetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
