import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSettingsMenuComponent } from './master-settings-menu.component';

describe('MasterSettingsMenuComponent', () => {
  let component: MasterSettingsMenuComponent;
  let fixture: ComponentFixture<MasterSettingsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSettingsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
