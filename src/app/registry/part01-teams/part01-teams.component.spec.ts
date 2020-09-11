import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part01TeamsComponent } from './part01-teams.component';

describe('Part01TeamsComponent', () => {
  let component: Part01TeamsComponent;
  let fixture: ComponentFixture<Part01TeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part01TeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part01TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
