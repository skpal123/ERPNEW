import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEntryLayoutComponent } from './master-entry-layout.component';

describe('MasterEntryLayoutComponent', () => {
  let component: MasterEntryLayoutComponent;
  let fixture: ComponentFixture<MasterEntryLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEntryLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEntryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
