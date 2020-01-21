import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgradeListComponent } from './subgrade-list.component';

describe('SubgradeListComponent', () => {
  let component: SubgradeListComponent;
  let fixture: ComponentFixture<SubgradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgradeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
