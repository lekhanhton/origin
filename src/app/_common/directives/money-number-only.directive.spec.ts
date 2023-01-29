import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MoneyNumberOnlyDirective } from './money-number-only.directive';
import { BigNumber } from '../data-types/big-number';

export class MockElementRef extends ElementRef {}

@Component({
  template: ` <input moneyNumberOnly [(inputValue)]="amount" (inputValueChange)="onChangeAmount($event)" /> `,
})
export class TestMoneyNumberOnlyDirectiveComponent {
  amount: BigNumber = new BigNumber(0);

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
      declarations: [MoneyNumberOnlyDirective, TestMoneyNumberOnlyDirectiveComponent],
      providers: [
        {
          provide: ElementRef,
          useValue: MockElementRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMoneyNumberOnlyDirectiveComponent);
    fixture.detectChanges();

    directiveElem = fixture.debugElement.query(By.directive(MoneyNumberOnlyDirective));
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
    directiveInstance.inputValue = new BigNumber(1000.55);
    directiveInstance.onInputFocusin();
    expect(directiveInstance['el'].nativeElement.value).toEqual('1000.55');
  });

  it('should update element value by focusout with a value', () => {
    directiveInstance.inputValue = new BigNumber(1000.55);
    directiveInstance.onInputFocusout();
    expect(directiveInstance['el'].nativeElement.value).toEqual('1,000.55');
  });

  it('should call emit change value = 1000', () => {
    spyOn(directiveInstance.inputValueChange, 'emit');
    directiveInstance['updateValue']('1000');
    expect(directiveInstance.inputValueChange.emit).toHaveBeenCalled();
  });

  it('should call emit with a invalid value', () => {
    spyOn(directiveInstance.inputValueChange, 'emit');
    directiveInstance['updateValue']('a');
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
    expect(directiveInstance['el'].nativeElement.value).toEqual('0');
  });
});
