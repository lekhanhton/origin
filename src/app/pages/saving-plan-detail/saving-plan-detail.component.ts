import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

import { CURRENCY_PIPE_DIGITS_INFO, DECIMAL_INPUT_NUMBER } from '../../_common/directives/money-number-only.directive';
import { LOCALSTORAGE_KEY } from '../../_common/constants/local-storage.constant';
import { ICountryCurrency } from '../../_common/models/country-currency.interface';
import { ISavingPlan } from '../../_common/models/saving-plan.interface';

@Component({
  selector: 'app-saving-plan-detail',
  templateUrl: './saving-plan-detail.component.html',
  styleUrls: ['./saving-plan-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingPlanDetailComponent implements OnInit, AfterViewChecked {
  @ViewChild('datePicker') datePicker!: NzDatePickerComponent;
  @ViewChild('hiddenDateSwitchElem') hiddenDateSwitchElem!: any;
  @ViewChild('monthlyAmountValueElem') monthlyAmountValueElem!: ElementRef;
  @ViewChild('detailMonthlyAmountElem') detailMonthlyAmountElem!: ElementRef;

  currentDate: Date = new Date();
  amount: number = 0;
  monthlyAmount: number = 0;
  amountDigit = '.0-0';
  monthlyAmountDigit = '.0-0';
  isChangeMonthDisabled: boolean = true;
  isReachDateChosenFocus: boolean = false;
  hiddenDateSwitch: boolean = false;
  isBreakLine: boolean = false;
  countryCurrency: ICountryCurrency = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.COUNTRY_CURRENCY)!);
  savingPlan: ISavingPlan = {
    amount: 0,
    reachDate: new Date(),
    monthTotal: 1,
    countryCode: this.countryCurrency?.countryCode,
    currencyCode: this.countryCurrency?.currencyCode,
    currencySymbol: this.countryCurrency?.currencySymbol,
  };

  constructor(
    private modal: NzModalService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.currentDate.setDate(1);
    this.currentDate.setHours(0, 0, 0, 0);
    this.savingPlan.reachDate.setDate(1);
    this.savingPlan.reachDate.setHours(0, 0, 0, 0);
  }

  ngAfterViewChecked() {
    const monthlyAmountValueWidth = this.monthlyAmountValueElem.nativeElement.offsetWidth;
    const detailMonthlyAmountWidth = this.detailMonthlyAmountElem.nativeElement.offsetWidth;
    this.isBreakLine = monthlyAmountValueWidth > detailMonthlyAmountWidth - 200;
    this.cdr.detectChanges();
  }

  onChangeAmount(amount: number) {
    this.savingPlan.amount = amount;
    this.amountDigit = this.savingPlan.amount % 1 !== 0 ? CURRENCY_PIPE_DIGITS_INFO : '.0-0';
    this.monthlyAmount = Number((this.savingPlan.amount / this.savingPlan.monthTotal).toFixed(DECIMAL_INPUT_NUMBER));
    this.monthlyAmountDigit = this.monthlyAmount % 1 !== 0 ? CURRENCY_PIPE_DIGITS_INFO : '.0-0';
  }

  onChangeMonth(step: number = 0) {
    const newReachDate = new Date(this.savingPlan.reachDate);
    newReachDate.setMonth(newReachDate.getMonth() + step);
    this.isChangeMonthDisabled = newReachDate.getTime() < this.currentDate.getTime();
    if (this.isChangeMonthDisabled) {
      return;
    }

    this.onChangeReachDate(newReachDate);
  }

  onChangeReachDate(date: Date) {
    const currentDate = new Date();
    currentDate.setDate(1);
    currentDate.setHours(0, 0, 0, 0);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    this.savingPlan.reachDate = new Date(date);
    this.savingPlan.reachDate.setDate(1);
    this.savingPlan.reachDate.setHours(0, 0, 0, 0);
    const reachYear = this.savingPlan.reachDate.getFullYear();
    const reachMonth = this.savingPlan.reachDate.getMonth();

    this.savingPlan.monthTotal = reachMonth - currentMonth + 1 + (reachYear - currentYear) * 12;
    this.onChangeAmount(this.savingPlan.amount);

    this.isChangeMonthDisabled = this.savingPlan.reachDate.getTime() <= this.currentDate.getTime();
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
      nzTitle: this.translateService.instant('SAVING_PLAN_DETAIL.CONFIRM_DIALOG.TITLE'),
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
