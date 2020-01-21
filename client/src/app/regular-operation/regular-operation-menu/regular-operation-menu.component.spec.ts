import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularOperationMenuComponent } from './regular-operation-menu.component';

describe('RegularOperationMenuComponent', () => {
  let component: RegularOperationMenuComponent;
  let fixture: ComponentFixture<RegularOperationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularOperationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularOperationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
