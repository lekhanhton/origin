import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MONEY_REGEX } from '../constants/regex.constant';
import { BigNumber } from '../data-types/big-number';
import { CommonUtil } from '../utils/common.util';

export const CURRENCY_PIPE_DISPLAY = '';
export const CURRENCY_PIPE_DIGITS_INFO = '.2-2';
export const DECIMAL_INPUT_NUMBER = 2;

@Directive({
  selector: 'input[moneyNumberOnly]',
})
export class MoneyNumberOnlyDirective {
  @Input() currencyUnit: string = '';
  @Input() inputValue: BigNumber = new BigNumber(0);
  @Output() inputValueChange: EventEmitter<BigNumber> = new EventEmitter<BigNumber>();

  constructor(private el: ElementRef) {
    this.el.nativeElement.value = CommonUtil.formatMoneyText(this.inputValue.toString());
  }

  @HostListener('input', ['$event']) onInputChange(event: any): void {
    this.updateValue(event.target.value);
  }

  @HostListener('focusin', ['$event']) onInputFocusin(): void {
    const inputValue = this.inputValue.toString();
    this.el.nativeElement.value = inputValue !== '0' ? inputValue : '';
  }

  @HostListener('focusout', ['$event']) onInputFocusout(): void {
    this.el.nativeElement.value = CommonUtil.formatMoneyText(this.inputValue.toString());
  }

  private updateValue(value: string): void {
    if ((!isNaN(+value) && MONEY_REGEX.test(value)) || value === '') {
      const inputByDotArr = value.toString().split('.');
      if (inputByDotArr[1]?.length > DECIMAL_INPUT_NUMBER) {
        this.inputValue = new BigNumber(value.slice(0, DECIMAL_INPUT_NUMBER - inputByDotArr[1].length));
        this.el.nativeElement.value = this.inputValue.toString();
      } else {
        this.inputValue = new BigNumber(value);
      }
    } else {
      this.el.nativeElement.value = this.inputValue.toString();
    }
    this.inputValueChange.emit(this.inputValue);
  }
}
