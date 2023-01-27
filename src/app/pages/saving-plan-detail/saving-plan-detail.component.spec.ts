import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingPlanDetailComponent } from './saving-plan-detail.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TranslateModule } from '@ngx-translate/core';

describe('SavingPlanDetailComponent', () => {
  let component: SavingPlanDetailComponent;
  let fixture: ComponentFixture<SavingPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingPlanDetailComponent],
      imports: [NzModalModule, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SavingPlanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('onChangeAmount', () => {
    it('should update monthly amount = 100 with amount = 100', () => {
      component.onChangeAmount(100);
      expect(component.monthlyAmount).toEqual(100);
    });

    it('should update monthly amount = 10 with amount = 100 and monthTotal = 10', () => {
      component.monthTotal = 10;
      component.onChangeAmount(100);
      expect(component.monthlyAmount).toEqual(10);
    });

    it('should update monthly amount = 15 with amount = 150 and monthTotal = 10', () => {
      component.monthTotal = 10;
      component.onChangeAmount(150);
      expect(component.monthlyAmount).toEqual(15);
    });

    it('should update monthly amount = 50.25 with amount = 100.50 and monthTotal = 2', () => {
      component.monthTotal = 2;
      component.onChangeAmount(100.5);
      expect(component.monthlyAmount).toEqual(50.25);
    });

    it('should update monthly amount = 333.33 with amount = 1000 and monthTotal = 3', () => {
      component.monthTotal = 3;
      component.onChangeAmount(1000);
      expect(component.monthlyAmount).toEqual(333.33);
    });
  });

  describe('onChangeMonth', () => {
    const reachDate = new Date();
    reachDate.setHours(0, 0, 0, 0);

    it(`should not update reach date`, () => {
      component.onChangeMonth();
      expect(component.reachDate.getTime()).toEqual(
        component.reachDate.getTime(),
      );
    });

    const newReachDate = new Date(reachDate);
    newReachDate.setMonth(newReachDate.getMonth() + 1);
    it(`should update reach date = ${newReachDate} with current reach date = ${reachDate} + 1 month`, () => {
      component.reachDate = new Date(reachDate);
      component.onChangeMonth(1);
      expect(component.reachDate.getTime()).toEqual(newReachDate.getTime());
    });

    const preReachDate = new Date(newReachDate);
    preReachDate.setMonth(preReachDate.getMonth() - 1);
    it(`should update reach date = ${preReachDate} with current reach date = ${newReachDate} - 1 month`, () => {
      component.reachDate = new Date(preReachDate);
      component.onChangeMonth(-1);
      expect(component.reachDate.getTime()).toEqual(preReachDate.getTime());
    });

    it(`should call onChangeReachDate with current reach date + 1 month`, () => {
      spyOn(component, 'onChangeReachDate');
      component.onChangeMonth(1);
      expect(component.onChangeReachDate).toHaveBeenCalled();
    });

    it(`should call onChangeReachDate with current reach date - 1 month`, () => {
      spyOn(component, 'onChangeReachDate');
      component.reachDate = new Date(newReachDate);
      component.onChangeMonth(-1);
      expect(component.onChangeReachDate).toHaveBeenCalled();
    });
  });

  describe('onChangeHiddenDateSwitch', () => {
    it('should call onChangeMonth with parameter -1', () => {
      spyOn(component, 'onChangeMonth');
      const mockArrowLeftEvent = new KeyboardEvent('', { code: 'ArrowLeft' });
      component.isReachDateChosenFocus = true;
      component.onChangeHiddenDateSwitch(mockArrowLeftEvent);
      expect(component.onChangeMonth).toHaveBeenCalledWith(-1);
    });

    it('should call onChangeMonth with parameter 1', () => {
      spyOn(component, 'onChangeMonth');
      const mockArrowRightEvent = new KeyboardEvent('', { code: 'ArrowRight' });
      component.isReachDateChosenFocus = true;
      component.onChangeHiddenDateSwitch(mockArrowRightEvent);
      expect(component.onChangeMonth).toHaveBeenCalledWith(1);
    });
  });

  describe('onConfirm', () => {
    it('should call success method of NzModalService', () => {
      spyOn(component['modal'], 'success');
      component.onConfirm();
      expect(component['modal'].success).toHaveBeenCalled();
    });
  });

  describe('disabledDate', () => {
    it('should return true', () => {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() - 1);
      expect(component.disabledDate(newDate)).toEqual(true);
    });

    it('should return false', () => {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 1);
      expect(component.disabledDate(newDate)).toEqual(false);
    });
  });

  describe('onClick', () => {
    it('should call checkAndClose of NzDatePickerComponent', () => {
      component.datePicker['checkAndClose'] = () => {};
      const spy = spyOn(component.datePicker, 'checkAndClose');
      component.onClick(null);
      expect(spy).toHaveBeenCalled();
    });
  });
});
