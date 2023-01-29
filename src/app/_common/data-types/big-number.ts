export const DECIMAL_MAX_LENGTH = 18;

export class BigNumber {
  bigint: bigint;
  isDecimalNumber: boolean = false;

  constructor(value: any) {
    let [int, dec] = String(value).split('.').concat('');
    this.isDecimalNumber = !!dec;
    dec = dec.padEnd(DECIMAL_MAX_LENGTH, '0');
    this.bigint = BigInt(int + dec);
  }

  static fromBigInt(bigint: bigint): BigNumber {
    return Object.assign(Object.create(BigNumber.prototype), { bigint });
  }

  divide(divisor: BigNumber): string {
    const integerAndDecimalPart = this.bigint * BigInt('1' + '0'.repeat(DECIMAL_MAX_LENGTH));
    const rs = BigNumber.fromBigInt(integerAndDecimalPart / divisor.bigint);
    return rs.toString();
  }

  toString(): string {
    const integerAndDecimalPart = this.bigint.toString().padStart(DECIMAL_MAX_LENGTH + 1, '0');
    const integerPart = integerAndDecimalPart.slice(0, -DECIMAL_MAX_LENGTH);
    const decimalPart = integerAndDecimalPart.slice(-DECIMAL_MAX_LENGTH).replace(/\.?0+$/, '');
    return decimalPart ? integerPart + '.' + decimalPart : integerPart;
  }
}
