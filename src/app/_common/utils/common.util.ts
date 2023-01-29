export class CommonUtil {
  public static formatMoneyText(inputValue: string = ''): string {
    const splitInputValue = inputValue.split('.');
    const integerPart = splitInputValue[0];
    const decimalPart = splitInputValue[1];
    const formatIntegerPart = this.getFormatIntegerPart(integerPart);
    const formatDecimalPart = this.getFormatDecimalPart(decimalPart);
    return formatDecimalPart ? formatIntegerPart + '.' + formatDecimalPart : formatIntegerPart;
  }

  private static getFormatIntegerPart(inputValue: string = ''): string {
    if (inputValue.includes('.')) {
      return '';
    }
    if (inputValue.length <= 3) {
      return inputValue;
    }
    const threeNumberArr = [];
    let elem = '';
    for (let idx = inputValue.length - 1; idx >= 0; idx--) {
      elem = inputValue[idx] + elem;
      if (elem.length === 3) {
        threeNumberArr.unshift(elem);
        elem = '';
      }
    }
    if (elem.length) {
      threeNumberArr.unshift(elem);
    }
    return threeNumberArr.join(',');
  }

  private static getFormatDecimalPart(inputValue: string = ''): string {
    if (inputValue.includes('.')) {
      return '';
    }
    if (!inputValue.length) {
      return inputValue;
    }
    const newValue = inputValue.slice(0, 2);
    return newValue.length > 1 ? newValue : newValue + '0';
  }
}
