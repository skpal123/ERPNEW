import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildFormulaComponent } from './build-formula.component';

describe('BuildFormulaComponent', () => {
  let component: BuildFormulaComponent;
  let fixture: ComponentFixture<BuildFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildFormulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
