import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapquestComponent } from './mapquest.component';

describe('MapquestComponent', () => {
  let component: MapquestComponent;
  let fixture: ComponentFixture<MapquestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapquestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
