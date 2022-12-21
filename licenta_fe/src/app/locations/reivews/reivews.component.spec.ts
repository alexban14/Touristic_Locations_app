import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReivewsComponent } from './reivews.component';

describe('ReivewsComponent', () => {
  let component: ReivewsComponent;
  let fixture: ComponentFixture<ReivewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReivewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReivewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
