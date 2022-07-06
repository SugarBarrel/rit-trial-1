import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentBadgeComponent } from './resident-badge.component';

describe('ResidentBadgeComponent', () => {
  let component: ResidentBadgeComponent;
  let fixture: ComponentFixture<ResidentBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
