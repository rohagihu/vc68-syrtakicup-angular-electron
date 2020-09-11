import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringModalComponent } from './scoring-modal.component';

describe('ScoringModalComponent', () => {
  let component: ScoringModalComponent;
  let fixture: ComponentFixture<ScoringModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
