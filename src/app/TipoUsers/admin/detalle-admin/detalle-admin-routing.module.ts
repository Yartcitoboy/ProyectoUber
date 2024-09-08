import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAdminPage } from './detalle-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAdminPageRoutingModule {}
