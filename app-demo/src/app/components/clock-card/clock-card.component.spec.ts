import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockCardComponent } from './clock-card.component';

describe('ClockCardComponent', () => {
  let component: ClockCardComponent;
  let fixture: ComponentFixture<ClockCardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
