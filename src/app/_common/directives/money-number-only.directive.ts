import {
  AfterContentChecked,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MONEY_REGEX } from '../constants/regex.constant';

export const CURRENCY_PIPE_DISPLAY = '';
export const CURRENCY_PIPE_DIGITS_INFO = '.2-2';
export const DECIMAL_INPUT_NUMBER = 2;

@Directive({
  selector: 'input[moneyNumberOnly]',
})
export class MoneyNumberOnlyDirective implements AfterContentChecked {
  @Input() isCurrencyInput: boolean = false;
  @Input() currencyUnit: string = 'VND';
  @Input() inputValue: any = 0;
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter<any>();

  isInitial: boolean = true;

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {}

  ngAfterContentChecked(): void {
    if (this.isInitial && this.isCurrencyInput) {
      this.el.nativeElement.value = this.transformEventValue();
    }
  }

  @HostListener('input', ['$event']) onInputChange(event: any): void {
    this.updateValue(event.target.value);
  }

  @HostListener('focusin', ['$event']) onInputFocusin(): void {
    this.isInitial = false;
    if (this.isCurrencyInput) {
      this.el.nativeElement.value = this.inputValue || '';
    }
  }

  @HostListener('focusout', ['$event']) onInputFocusout(): void {
    if (this.isCurrencyInput) {
      this.el.nativeElement.value = this.transformEventValue();
    }
  }

  private transformEventValue(): string {
    const currencyEventValue = this.currencyPipe.transform(
      this.inputValue || 0,
      this.currencyUnit,
      CURRENCY_PIPE_DISPLAY,
      CURRENCY_PIPE_DIGITS_INFO
    );
    return currencyEventValue || '';
  }

  private updateValue(value: string): void {
    if ((!isNaN(+value) && MONEY_REGEX.test(value)) || value === '') {
      this.inputValue = value;
      const inputByDotArr = this.inputValue.split('.');
      if (inputByDotArr[1]?.length > DECIMAL_INPUT_NUMBER) {
        this.inputValue = this.inputValue.slice(
          0,
          DECIMAL_INPUT_NUMBER - inputByDotArr[1].length
        );
      }
    }
    this.el.nativeElement.value = this.inputValue;
    this.inputValueChange.emit(+this.inputValue);
  }
}
