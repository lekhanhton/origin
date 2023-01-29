import { CommonUtil } from './common.util';

describe('CommonUtil', () => {
  describe('formatMoneyText', () => {
    it('should return "" if param = ""', () => {
      expect(CommonUtil.formatMoneyText('')).toEqual('');
    });

    it('should return "" if not have param', () => {
      expect(CommonUtil.formatMoneyText()).toEqual('');
    });

    it('should return "10" if param = "10"', () => {
      expect(CommonUtil.formatMoneyText('10')).toEqual('10');
    });

    it('should return "100,000" if param = "100000"', () => {
      expect(CommonUtil.formatMoneyText('100000')).toEqual('100,000');
    });

    it('should return "100.50" if param = "100.5"', () => {
      expect(CommonUtil.formatMoneyText('100.5')).toEqual('100.50');
    });

    it('should return "3,333.33" if param = "3333.333333333333"', () => {
      expect(CommonUtil.formatMoneyText('3333.333333333333')).toEqual('3,333.33');
    });
  });

  describe('getFormatIntegerPart', () => {
    it('should return "" if param = ""', () => {
      expect(CommonUtil['getFormatIntegerPart']('')).toEqual('');
    });

    it('should return "" if not have param', () => {
      expect(CommonUtil['getFormatIntegerPart']()).toEqual('');
    });

    it('should return "100" if param = "100"', () => {
      expect(CommonUtil['getFormatIntegerPart']('100')).toEqual('100');
    });

    it('should return "1,000" if param = "1000"', () => {
      expect(CommonUtil['getFormatIntegerPart']('1000')).toEqual('1,000');
    });

    it('should return "" if param = "8.8"', () => {
      expect(CommonUtil['getFormatIntegerPart']('8.8')).toEqual('');
    });

    it('should return "123,456,789" if param = "123456789"', () => {
      expect(CommonUtil['getFormatIntegerPart']('123456789')).toEqual('123,456,789');
    });

    it('should return "888,888,888,888,888,888,888,888,888,888" if param = "888888888888888888888888888888"', () => {
      expect(CommonUtil['getFormatIntegerPart']('888888888888888888888888888888')).toEqual(
        '888,888,888,888,888,888,888,888,888,888',
      );
    });
  });

  describe('getFormatDecimalPart', () => {
    it('should return "" if param = ""', () => {
      expect(CommonUtil['getFormatDecimalPart']('')).toEqual('');
    });

    it('should return "" if param = "9.9999"', () => {
      expect(CommonUtil['getFormatDecimalPart']('9.9999')).toEqual('');
    });

    it('should return "0" if param = ""', () => {
      expect(CommonUtil['getFormatDecimalPart']('0')).toEqual('00');
    });

    it('should return "5" if param = ""', () => {
      expect(CommonUtil['getFormatDecimalPart']('5')).toEqual('50');
    });

    it('should return "55" if param = "55555"', () => {
      expect(CommonUtil['getFormatDecimalPart']('55555')).toEqual('55');
    });
  });
});
