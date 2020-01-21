import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicMenuComponent } from './geographic-menu.component';

describe('GeographicMenuComponent', () => {
  let component: GeographicMenuComponent;
  let fixture: ComponentFixture<GeographicMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
