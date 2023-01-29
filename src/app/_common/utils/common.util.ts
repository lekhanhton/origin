export class CommonUtil {
  public static formatMoney(inputValue: string): string {
    const splitInputValue = inputValue.split('.');
    const integerPart = splitInputValue[0];
    const decimalPart = splitInputValue[1];
    const formatIntegerPart = this.getFormatIntegerPart(integerPart);
    const formatDecimalPart = this.getFormatDecimalPart(decimalPart);
    return formatDecimalPart ? formatIntegerPart + '.' + formatDecimalPart : formatIntegerPart;
  }

  private static getFormatIntegerPart(inputValue: string = ''): string {
    const threeNumberArr = [];
    let elem = '';
    for (let idx = 0; idx < inputValue.length; idx++) {
      elem += inputValue[idx];
      if (idx % 3 === 0) {
        threeNumberArr.push(elem);
        elem = '';
      }
    }
    return threeNumberArr.join(',');
  }

  private static getFormatDecimalPart(inputValue: string = ''): string {
    return inputValue;
  }
}
