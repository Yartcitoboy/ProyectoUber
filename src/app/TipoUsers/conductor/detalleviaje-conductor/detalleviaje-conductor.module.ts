import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleviajeConductorPageRoutingModule } from './detalleviaje-conductor-routing.module';

import { DetalleviajeConductorPage } from './detalleviaje-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleviajeConductorPageRoutingModule
  ],
  declarations: [DetalleviajeConductorPage]
})
export class DetalleviajeConductorPageModule {}
