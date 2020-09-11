import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part02RulesComponent } from './part02-rules.component';

describe('Part02RulesComponent', () => {
  let component: Part02RulesComponent;
  let fixture: ComponentFixture<Part02RulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part02RulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part02RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
