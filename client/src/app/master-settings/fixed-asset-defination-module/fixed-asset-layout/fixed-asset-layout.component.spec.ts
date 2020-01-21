import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetLayoutComponent } from './fixed-asset-layout.component';

describe('FixedAssetLayoutComponent', () => {
  let component: FixedAssetLayoutComponent;
  let fixture: ComponentFixture<FixedAssetLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
