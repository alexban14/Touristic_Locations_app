import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPageEventComponent } from './show-page-event.component';

describe('ShowPageEventComponent', () => {
  let component: ShowPageEventComponent;
  let fixture: ComponentFixture<ShowPageEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPageEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPageEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
