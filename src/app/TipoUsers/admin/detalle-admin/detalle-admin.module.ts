import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAdminPageRoutingModule } from './detalle-admin-routing.module';

import { DetalleAdminPage } from './detalle-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAdminPageRoutingModule
  ],
  declarations: [DetalleAdminPage]
})
export class DetalleAdminPageModule {}
