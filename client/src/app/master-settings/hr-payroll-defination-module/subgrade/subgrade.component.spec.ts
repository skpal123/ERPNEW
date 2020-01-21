import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgradeComponent } from './subgrade.component';

describe('SubgradeComponent', () => {
  let component: SubgradeComponent;
  let fixture: ComponentFixture<SubgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
