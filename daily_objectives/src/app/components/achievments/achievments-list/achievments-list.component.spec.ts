import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentsListComponent } from './achievments-list.component';

describe('AchievmentsListComponent', () => {
  let component: AchievmentsListComponent;
  let fixture: ComponentFixture<AchievmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievmentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
