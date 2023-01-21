import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavingPlanDetailComponent } from './saving-plan-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: SavingPlanDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingPlanDetailRoutingModule { }
