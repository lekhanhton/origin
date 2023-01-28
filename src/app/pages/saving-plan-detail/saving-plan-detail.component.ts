import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

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
  @ViewChild('hiddenDateSwitchElem') hiddenDateSwitchElem!: any;
  @ViewChild('monthlyAmountValueElem') monthlyAmountValueElem!: ElementRef;
  @ViewChild('detailMonthlyAmountElem') detailMonthlyAmountElem!: ElementRef;

  currentDate: Date = new Date();
  reachDate: Date = new Date();
  amount: number = 0;
  monthTotal: number = 1;
  monthlyAmount: number = 0;
  amountDigit = '.0-0';
  monthlyAmountDigit = '.0-0';
  isChangeMonthDisabled: boolean = true;
  isReachDateChosenFocus: boolean = false;
  hiddenDateSwitch: boolean = false;
  isBreakLine: boolean = false;

  constructor(
    private modal: NzModalService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.currentDate.setHours(0, 0, 0, 0);
    this.reachDate.setHours(0, 0, 0, 0);
  }

  onChangeAmount(amount: number) {
    this.amount = amount;
    this.amountDigit =
      this.amount % 1 !== 0 ? CURRENCY_PIPE_DIGITS_INFO : '.0-0';
    this.monthlyAmount = Number(
      (this.amount / this.monthTotal).toFixed(DECIMAL_INPUT_NUMBER),
    );
    this.monthlyAmountDigit =
      this.monthlyAmount % 1 !== 0 ? CURRENCY_PIPE_DIGITS_INFO : '.0-0';
    const monthlyAmountValueWidth =
      this.monthlyAmountValueElem.nativeElement.offsetWidth;
    const detailMonthlyAmountWidth =
      this.detailMonthlyAmountElem.nativeElement.offsetWidth;
    this.isBreakLine = monthlyAmountValueWidth > detailMonthlyAmountWidth - 200;
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
    currentDate.setHours(0, 0, 0, 0);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    this.reachDate.setHours(0, 0, 0, 0);
    const reachYear = this.reachDate.getFullYear();
    const reachMonth = this.reachDate.getMonth();

    this.monthTotal =
      reachMonth - currentMonth + 1 + (reachYear - currentYear) * 12;
    this.onChangeAmount(this.amount);

    this.isChangeMonthDisabled =
      this.reachDate.getTime() <= this.currentDate.getTime();
  }

  onChangeHiddenDateSwitch(event: KeyboardEvent) {
    if (this.isReachDateChosenFocus) {
      switch (event.code) {
        case 'ArrowLeft':
          this.onChangeMonth(-1);
          break;
        case 'ArrowRight':
          this.onChangeMonth(1);
          break;
      }
    }
  }

  onConfirm(): void {
    this.modal.success({
      nzTitle: this.translateService.instant(
        'SAVING_PLAN_DETAIL.CONFIRM_DIALOG.TITLE',
      ),
      nzClosable: false,
    });
  }

  disabledDate = (date: Date): boolean => {
    return date.getTime() < this.currentDate.getTime();
  };

  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    const reachDateChosen = document.getElementById('reach-date-chosen')!;
    const reachDateView = document.getElementById('reach-date-view')!;
    this.isReachDateChosenFocus = reachDateChosen.contains(target);
    if (this.isReachDateChosenFocus) {
      !reachDateView.contains(target) && this.hiddenDateSwitchElem.focus();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const amountElem = document.getElementById('amount');
    if (event.code === 'Tab' && event.target === amountElem) {
      event.preventDefault();
      this.isReachDateChosenFocus = true;
      this.hiddenDateSwitchElem.focus();
    }

    this.onChangeHiddenDateSwitch(event);
  }
}
