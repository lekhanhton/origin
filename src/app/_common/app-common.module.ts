import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { MoneyNumberOnlyDirective } from './directives/money-number-only.directive';
import { FormatMoneyPipe } from './pipes/format-money.pipe';

const CoreModule = [CommonModule, FormsModule, RouterModule];

const ThirdPartyModule = [
  AngularSvgIconModule,
  TranslateModule,

  // NzModule
  NzLayoutModule,
  NzInputModule,
  NzFormModule,
  NzDatePickerModule,
  NzIconModule,
  NzSwitchModule,
];

const directives = [MoneyNumberOnlyDirective];

const pipes = [FormatMoneyPipe];

const providers = [CurrencyPipe];

@NgModule({
  declarations: [...directives, ...pipes],
  imports: [...CoreModule, ...ThirdPartyModule],
  exports: [...CoreModule, ...ThirdPartyModule, ...directives, ...pipes],
  providers: [...providers],
})
export class AppCommonModule {}
