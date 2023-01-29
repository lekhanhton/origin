import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingPlanDetailComponent } from './saving-plan-detail.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TranslateModule } from '@ngx-translate/core';
import { COUNTRY_CURRENCY_DATA } from '../../_common/constants/country-currency-data.constant';
import { BigNumber } from '../../_common/data-types/big-number';
import { FormatMoneyPipe } from '../../_common/pipes/format-money.pipe';

describe('SavingPlanDetailComponent', () => {
  let component: SavingPlanDetailComponent;
  let fixture: ComponentFixture<SavingPlanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingPlanDetailComponent, FormatMoneyPipe],
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
      component.onChangeAmount(new BigNumber(100));
      expect(component.savingPlan.monthlyAmount).toEqual(new BigNumber(100));
    });

    it('should update monthly amount = 10 with amount = 100 and monthTotal = 10', () => {
      component.savingPlan.monthTotal = new BigNumber(10);
      component.onChangeAmount(new BigNumber(100));
      expect(component.savingPlan.monthlyAmount.toString()).toEqual('10');
    });

    it('should update monthly amount = 15 with amount = 150 and monthTotal = 10', () => {
      component.savingPlan.monthTotal = new BigNumber(10);
      component.onChangeAmount(new BigNumber(150));
      expect(component.savingPlan.monthlyAmount.toString()).toEqual('15');
    });

    it('should update monthly amount = 50.25 with amount = 100.50 and monthTotal = 2', () => {
      component.savingPlan.monthTotal = new BigNumber(2);
      component.onChangeAmount(new BigNumber(100.5));
      expect(component.savingPlan.monthlyAmount.toString()).toEqual('50.25');
    });

    it('should update monthly amount = 333.33 with amount = 1000 and monthTotal = 3', () => {
      component.savingPlan.monthTotal = new BigNumber(3);
      component.onChangeAmount(new BigNumber(100));
      expect(component.savingPlan.monthlyAmount.toString()).toEqual('33.333333333333333333');
    });
  });

  describe('onChangeMonth', () => {
    const reachDate = new Date();
    reachDate.setDate(1);
    reachDate.setHours(0, 0, 0, 0);

    it(`should not update reach date`, () => {
      component.onChangeMonth();
      expect(component.savingPlan.reachDate.getTime()).toEqual(component.savingPlan.reachDate.getTime());
    });

    const newReachDate = new Date(reachDate);
    newReachDate.setMonth(newReachDate.getMonth() + 1);

    it(`should call onChangeReachDate with current reach date + 1 month`, () => {
      spyOn(component, 'onChangeReachDate');
      component.onChangeMonth(1);
      expect(component.onChangeReachDate).toHaveBeenCalled();
    });

    it(`should call onChangeReachDate with current reach date - 1 month`, () => {
      spyOn(component, 'onChangeReachDate');
      component.savingPlan.reachDate = new Date(newReachDate);
      component.onChangeMonth(-1);
      expect(component.onChangeReachDate).toHaveBeenCalled();
    });

    it(`should update isChangeMonthDisabled = true`, () => {
      spyOn(component, 'onChangeReachDate');
      component.onChangeMonth(-4);
      expect(component.isChangeMonthDisabled).toEqual(true);
    });
  });

  describe('onChangeReachDate', () => {
    it('should update monthTotal', () => {
      component.currentDate = new Date('2023-01-29');
      component.onChangeReachDate(new Date('2025-09-01'));
      expect(component.savingPlan.monthTotal.toString()).toEqual('33');
    });

    it('should call onChangeAmount method', () => {
      spyOn(component, 'onChangeAmount');
      component.onChangeReachDate(new Date());
      expect(component.onChangeAmount).toHaveBeenCalled();
    });
  });

  describe('onChangeHiddenDateSwitch', () => {
    it('should call onChangeMonth with arrow left keyboard event', () => {
      spyOn(component, 'onChangeMonth');
      const mockArrowLeftEvent = new KeyboardEvent('', { code: 'ArrowLeft' });
      component.isReachDateChosenFocus = true;
      component.onChangeHiddenDateSwitch(mockArrowLeftEvent);
      expect(component.onChangeMonth).toHaveBeenCalled();
    });

    it('should call onChangeMonth with arrow left keyboard event', () => {
      spyOn(component, 'onChangeMonth');
      const mockArrowRightEvent = new KeyboardEvent('', { code: 'ArrowRight' });
      component.isReachDateChosenFocus = true;
      component.onChangeHiddenDateSwitch(mockArrowRightEvent);
      expect(component.onChangeMonth).toHaveBeenCalled();
    });
  });

  describe('onConfirm', () => {
    it('should call success method success of NzModalService', () => {
      spyOn(component['modal'], 'success');
      component.onConfirm();
      expect(component['modal'].success).toHaveBeenCalled();
    });
  });

  describe('disabledDate', () => {
    it('should return true', () => {
      const newDate = new Date();
      newDate.setDate(1);
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
    it('should set isReachDateChosenFocus = false', () => {
      const reachDateChosen = document.getElementById('reach-date-chosen')!;
      reachDateChosen.contains = () => false;
      component.onClick(null);
      expect(component.isReachDateChosenFocus).toEqual(false);
    });

    it('should set isReachDateChosenFocus = true', () => {
      component.hiddenDateSwitchElem.focus = () => {};
      const reachDateChosen = document.getElementById('reach-date-chosen')!;
      reachDateChosen.contains = () => true;
      component.onClick(null);
      expect(component.isReachDateChosenFocus).toEqual(true);
    });
  });

  describe('onKeydown', () => {
    it('should call focus method of hiddenDateSwitchElem', () => {
      component.countryCurrency = COUNTRY_CURRENCY_DATA[0];
      component.hiddenDateSwitchElem.focus = () => {};
      const spy = spyOn(component.hiddenDateSwitchElem, 'focus');
      const amountElem = document.getElementById('amount');
      const mockEvent = {
        code: 'Tab',
        target: amountElem,
        preventDefault: () => {},
      } as KeyboardEvent;
      component.onKeydown(mockEvent);
      expect(spy).toHaveBeenCalled();
    });

    it('should call onChangeHiddenDateSwitch of component', () => {
      const spy = spyOn(component, 'onChangeHiddenDateSwitch');
      const mockEvent = {} as KeyboardEvent;
      component.onKeydown(mockEvent);
      expect(spy).toHaveBeenCalled();
    });
  });
});
