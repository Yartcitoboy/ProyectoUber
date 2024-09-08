import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenplashPage } from './screenplash.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenplashPageRoutingModule {}
