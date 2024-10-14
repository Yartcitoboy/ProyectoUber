import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleviajeConductorPage } from './detalleviaje-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleviajeConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleviajeConductorPageRoutingModule {}
