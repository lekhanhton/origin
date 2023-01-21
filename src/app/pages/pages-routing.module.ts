import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PagesModule } from './pages.module';

export const ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: '/saving-plan-detail',
      },
      {
        path: 'saving-plan-detail',
        loadChildren: () => import('./saving-plan-detail/saving-plan-detail.module').then((m) => m.SavingPlanDetailModule),
      },
    ],
  },
];

@NgModule({
  imports: [PagesModule, RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
