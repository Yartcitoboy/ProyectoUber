import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirViajePageRoutingModule } from './pedir-viaje-routing.module';

import { PedirViajePage } from './pedir-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedirViajePageRoutingModule
  ],
  declarations: [PedirViajePage]
})
export class PedirViajePageModule {}
