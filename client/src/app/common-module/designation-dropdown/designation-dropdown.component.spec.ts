import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationDropdownComponent } from './designation-dropdown.component';

describe('DesignationDropdownComponent', () => {
  let component: DesignationDropdownComponent;
  let fixture: ComponentFixture<DesignationDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
