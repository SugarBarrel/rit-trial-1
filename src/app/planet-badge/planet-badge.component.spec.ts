import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetBadgeComponent } from './planet-badge.component';

describe('PlanetBadgeComponent', () => {
  let component: PlanetBadgeComponent;
  let fixture: ComponentFixture<PlanetBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
