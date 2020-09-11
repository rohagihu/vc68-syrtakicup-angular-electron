import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreliminaryRoundComponent } from './preliminary-round.component';

describe('PreliminaryRoundComponent', () => {
  let component: PreliminaryRoundComponent;
  let fixture: ComponentFixture<PreliminaryRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreliminaryRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreliminaryRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
