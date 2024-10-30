import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebaQRPage } from './prueba-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PruebaQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebaQRPageRoutingModule {}
