import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentsDetailComponent } from './achievments-detail.component';

describe('AchievmentsDetailComponent', () => {
  let component: AchievmentsDetailComponent;
  let fixture: ComponentFixture<AchievmentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievmentsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievmentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
