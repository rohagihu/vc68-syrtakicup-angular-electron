import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsHeadComponent } from './groups-head.component';

describe('GroupsHeadComponent', () => {
  let component: GroupsHeadComponent;
  let fixture: ComponentFixture<GroupsHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
