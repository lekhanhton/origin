import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingPlanDetailComponent } from './saving-plan-detail.component';

describe('SavingPlanDetailComponent', () => {
  let component: SavingPlanDetailComponent;
  let fixture: ComponentFixture<SavingPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingPlanDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SavingPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
