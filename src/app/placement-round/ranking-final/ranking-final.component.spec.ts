import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingFinalComponent } from './ranking-final.component';

describe('RankingFinalComponent', () => {
  let component: RankingFinalComponent;
  let fixture: ComponentFixture<RankingFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
