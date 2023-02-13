import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEventsHomeComponent } from './show-events-home.component';

describe('ShowEventsHomeComponent', () => {
  let component: ShowEventsHomeComponent;
  let fixture: ComponentFixture<ShowEventsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEventsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowEventsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
