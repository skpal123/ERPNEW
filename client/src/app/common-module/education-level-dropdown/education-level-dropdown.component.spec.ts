import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationLevelDropdownComponent } from './education-level-dropdown.component';

describe('EducationLevelDropdownComponent', () => {
  let component: EducationLevelDropdownComponent;
  let fixture: ComponentFixture<EducationLevelDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationLevelDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationLevelDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
