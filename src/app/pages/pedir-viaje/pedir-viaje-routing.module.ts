import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedirViajePage } from './pedir-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: PedirViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedirViajePageRoutingModule {}
