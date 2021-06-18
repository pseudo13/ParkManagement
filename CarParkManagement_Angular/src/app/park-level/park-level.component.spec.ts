import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkLevelComponent } from './park-level.component';

describe('ParkLevelComponent', () => {
  let component: ParkLevelComponent;
  let fixture: ComponentFixture<ParkLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
