import { BigNumber } from './big-number';

describe('BigNumber', () => {
  it('should be 5 when 10 divide 2', () => {
    const a = new BigNumber('10');
    const b = new BigNumber('2');
    const rs = a.divide(b);
    expect(rs).toEqual('5');
  });

  it('should be 61728394561728394938.25 when 123456789123456789876.50 divide 2', () => {
    const a = new BigNumber('123456789123456789876.50');
    const b = new BigNumber('2');
    const rs = a.divide(b);
    expect(rs).toEqual('61728394561728394938.25');
  });

  it('should be 333333333.333333333333333333 when 1000000000 divide 3', () => {
    const a = new BigNumber('1000000000');
    const b = new BigNumber('3');
    const rs = a.divide(b);
    expect(rs).toEqual('333333333.333333333333333333');
  });
});
