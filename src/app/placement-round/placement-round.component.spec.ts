import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementRoundComponent } from './placement-round.component';

describe('PlacementRoundComponent', () => {
  let component: PlacementRoundComponent;
  let fixture: ComponentFixture<PlacementRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacementRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacementRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
