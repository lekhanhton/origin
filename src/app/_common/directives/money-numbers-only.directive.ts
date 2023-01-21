import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ElementRef,
  AfterContentChecked
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export const CURRENCY_PIPE_DISPLAY = '';
export const CURRENCY_PIPE_DIGITS_INFO = '.2-2';
export const DECIMAL_INPUT_NUMBER = 2;

@Directive({
  selector: 'input[moneyNumbersOnly]',
})
export class MoneyNumbersOnlyDirective implements AfterContentChecked {
  @Input() isCurrencyInput: boolean = false;
  @Input() currencyUnit: string = 'VND';
  @Input() inputValue: any = 0;
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter<any>();

  isInitial: boolean = true;

  constructor(
    private el: ElementRef,
    private currencyPipe: CurrencyPipe,
  ) {}

  ngAfterContentChecked(): void {
    if (this.isInitial && this.isCurrencyInput) {
      this.el.nativeElement.value = this.transformEventValue();
    }
  }

  @HostListener('input', ['$event']) onInputChange(): void {
    const initialValue: string = this.el.nativeElement.value || '0';
    this.el.nativeElement.value = initialValue.replace(/[^0-9.]*/g, '');
    if (initialValue === '.') {
      this.el.nativeElement.value = initialValue.slice(0, -1);
    }
    const dotCount = initialValue.split('').filter(e => e === '.').length;
    if (dotCount > 1) {
      this.el.nativeElement.value = initialValue.slice(0, -1);
    }
    const inputByDotArr = initialValue.split('.');
    if (inputByDotArr[1]?.length > DECIMAL_INPUT_NUMBER) {
      this.el.nativeElement.value = initialValue.slice(0, -1);
    }
    this.inputValueChange.emit(+this.el.nativeElement.value);
  }

  @HostListener('focusin', ['$event']) onInputFocusin(): void {
    this.isInitial = false;
    if (this.isCurrencyInput) {
      this.el.nativeElement.value = this.inputValue || 0;
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
}
