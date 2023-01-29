import { Pipe, PipeTransform } from '@angular/core';
import { CommonUtil } from '../utils/common.util';

@Pipe({
  name: 'formatMoney',
})
export class FormatMoneyPipe implements PipeTransform {
  transform(value: any = '', args?: any): any {
    return CommonUtil.formatMoney(value);
  }
}
