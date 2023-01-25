import { NgModule } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NzModalService } from 'ng-zorro-antd/modal';

import { AppCommonModule } from '../../_common/app-common.module';

import { SavingPlanDetailComponent } from './saving-plan-detail.component';
import { SavingPlanDetailRoutingModule } from './saving-plan-detail-routing.module';

@NgModule({
  declarations: [SavingPlanDetailComponent],
  imports: [SavingPlanDetailRoutingModule, AppCommonModule],
  providers: [NzModalService, TranslateService],
})
export class SavingPlanDetailModule {}
