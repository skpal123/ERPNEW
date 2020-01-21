import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetEntryComponent } from './fixed-asset-entry.component';

describe('FixedAssetEntryComponent', () => {
  let component: FixedAssetEntryComponent;
  let fixture: ComponentFixture<FixedAssetEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
