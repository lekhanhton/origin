import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

import {
  CURRENCY_PIPE_DIGITS_INFO,
  DECIMAL_INPUT_NUMBER,
} from '../../_common/directives/money-number-only.directive';

@Component({
  selector: 'app-saving-plan-detail',
  templateUrl: './saving-plan-detail.component.html',
  styleUrls: ['./saving-plan-detail.component.scss'],
})
export class SavingPlanDetailComponent implements OnInit {
  @ViewChild('datePicker') datePicker!: NzDatePickerComponent;

  currentDate: Date = new Date();
  reachDate: Date = new Date();
  amount: number = 0;
  monthTotal: number = 1;
  monthlyAmount: number = 0;
  currencyDigitsInfo = CURRENCY_PIPE_DIGITS_INFO;
  isChangeMonthDisabled: boolean = true;
  isReachDateChosenFocus: boolean = false;
  hiddenDateSwitch: boolean = false;

  constructor(
    private modal: NzModalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  onChangeAmount(amount: number) {
    this.amount = amount;
    this.monthlyAmount = Number(
      (this.amount / this.monthTotal).toFixed(DECIMAL_INPUT_NUMBER)
    );
  }

  onChangeMonth(step: number = 0) {
    const newReachDate = new Date(this.reachDate);
    newReachDate.setMonth(newReachDate.getMonth() + step);
    this.isChangeMonthDisabled =
      newReachDate.getTime() < this.currentDate.getTime();
    if (this.isChangeMonthDisabled) {
      return;
    }

    this.reachDate = newReachDate;
    this.onChangeReachDate();
  }

  onChangeReachDate() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const reachYear = this.reachDate.getFullYear();
    const reachMonth = this.reachDate.getMonth();
    this.monthTotal =
      reachMonth - currentMonth + 1 + (reachYear - currentYear) * 12;
    this.monthlyAmount = Number(
      (this.amount / this.monthTotal).toFixed(DECIMAL_INPUT_NUMBER)
    );
    this.isChangeMonthDisabled =
      this.reachDate.getTime() < this.currentDate.getTime();
  }

  onChangeHiddenDateSwitch(event: any) {
    if (this.isReachDateChosenFocus) {
      switch (event.keyCode) {
        case 37:
          this.onChangeMonth(-1);
          break;
        case 39:
          this.onChangeMonth(1);
          break;
      }
    }
  }

  onConfirm(): void {
    this.modal.success({
      nzTitle: this.translateService.instant(
        'SAVING_PLAN_DETAIL.CONFIRM_DIALOG.TITLE'
      ),
      nzClosable: false,
    });
  }

  disabledDate = (date: Date): boolean => {
    return date.getTime() < this.currentDate.getTime();
  };

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    const reachDateChosen = document.getElementById('reach-date-chosen');
    if (reachDateChosen) {
      this.isReachDateChosenFocus = reachDateChosen.contains(target);
      if (!this.isReachDateChosenFocus) {
        this.datePicker.checkAndClose();
      }
    }
  }
}
