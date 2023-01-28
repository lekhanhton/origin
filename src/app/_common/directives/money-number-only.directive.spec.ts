import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';

import { MoneyNumberOnlyDirective } from './money-number-only.directive';

export class MockElementRef extends ElementRef {}

@Component({
  template: `
    <input
      moneyNumberOnly
      [(inputValue)]="amount"
      (inputValueChange)="onChangeAmount($event)"
    />
  `,
})
export class TestMoneyNumberOnlyDirectiveComponent {
  amount: number = 0;

  onChangeAmount(event: any) {
    console.log(event);
  }
}

describe('MoneyNumberOnlyDirective', () => {
  let fixture: ComponentFixture<TestMoneyNumberOnlyDirectiveComponent>;
  let directiveElem: DebugElement;
  let directiveInstance: MoneyNumberOnlyDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MoneyNumberOnlyDirective,
        TestMoneyNumberOnlyDirectiveComponent,
      ],
      providers: [
        {
          provide: ElementRef,
          useValue: MockElementRef,
        },
        CurrencyPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMoneyNumberOnlyDirectiveComponent);
    fixture.detectChanges();

    directiveElem = fixture.debugElement.query(
      By.directive(MoneyNumberOnlyDirective),
    );
    directiveInstance = directiveElem.injector.get(MoneyNumberOnlyDirective);
  });

  it('should create an instance', () => {
    expect(directiveElem).toBeTruthy();
  });

  it('should call updateValue', () => {
    spyOn(MoneyNumberOnlyDirective.prototype as any, 'updateValue');
    const mockEvent = {
      target: {
        value: 100,
      },
    };
    directiveInstance.onInputChange(mockEvent);
    expect(directiveInstance['updateValue']).toHaveBeenCalled();
  });

  it('should update element value by focusin', () => {
    directiveInstance.onInputFocusin();
    expect(directiveInstance['el'].nativeElement.value).toEqual('');
  });

  it('should update element value by focusout', () => {
    directiveInstance.onInputFocusout();
    expect(directiveInstance['el'].nativeElement.value).toEqual('0');
  });

  it('should update element value by focusin with a value', () => {
    directiveInstance.inputValue = 1000.55;
    directiveInstance.onInputFocusin();
    expect(directiveInstance['el'].nativeElement.value).toEqual('1000.55');
  });

  it('should update element value by focusout with a value', () => {
    directiveInstance.inputValue = 1000.55;
    directiveInstance.onInputFocusout();
    expect(directiveInstance['el'].nativeElement.value).toEqual('1,000.55');
  });

  it('should return a custom value with value = 1000', () => {
    directiveInstance.inputValue = 1000;
    expect(directiveInstance['transformEventValue']()).toEqual('1,000');
  });

  it('should return a custom value with value = 10000.51', () => {
    directiveInstance.inputValue = 10000.51;
    expect(directiveInstance['transformEventValue']()).toEqual('10,000.51');
  });

  it('should return a custom value with value = 0', () => {
    directiveInstance.inputValue = 0;
    expect(directiveInstance['transformEventValue']()).toEqual('0');
  });

  it('should call emit change value = 1000', () => {
    spyOn(directiveInstance.inputValueChange, 'emit');
    directiveInstance['updateValue']('1000');
    expect(directiveInstance.inputValueChange.emit).toHaveBeenCalled();
  });

  it('should update element value with input value = 1000.555', () => {
    spyOn(directiveInstance.inputValueChange, 'emit');
    directiveInstance['updateValue']('1000.555');
    expect(directiveInstance['el'].nativeElement.value).toEqual('1000.55');
  });

  it('should update element value with input value = ""', () => {
    spyOn(directiveInstance.inputValueChange, 'emit');
    directiveInstance['updateValue']('');
    expect(directiveInstance['el'].nativeElement.value).toEqual('');
  });
});
