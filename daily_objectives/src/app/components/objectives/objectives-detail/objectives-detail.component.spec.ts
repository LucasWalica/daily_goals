import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesDetailComponent } from './objectives-detail.component';

describe('ObjectivesDetailComponent', () => {
  let component: ObjectivesDetailComponent;
  let fixture: ComponentFixture<ObjectivesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectivesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectivesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
