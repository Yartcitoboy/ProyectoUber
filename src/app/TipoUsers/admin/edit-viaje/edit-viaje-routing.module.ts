import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditViajePage } from './edit-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: EditViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditViajePageRoutingModule {}
