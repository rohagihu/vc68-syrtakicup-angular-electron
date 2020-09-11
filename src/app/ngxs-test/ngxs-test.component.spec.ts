import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsTestComponent } from './ngxs-test.component';

describe('NgxsTestComponent', () => {
  let component: NgxsTestComponent;
  let fixture: ComponentFixture<NgxsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
