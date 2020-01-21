import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationDropdownComponent } from './occupation-dropdown.component';

describe('OccupationDropdownComponent', () => {
  let component: OccupationDropdownComponent;
  let fixture: ComponentFixture<OccupationDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
