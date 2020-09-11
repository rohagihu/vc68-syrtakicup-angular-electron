import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part3GameSchedulesComponent } from './part03-game-schedules.component';

describe('Part3GameSchedulesComponent', () => {
  let component: Part3GameSchedulesComponent;
  let fixture: ComponentFixture<Part3GameSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part3GameSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part3GameSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
