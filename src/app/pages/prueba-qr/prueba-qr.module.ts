import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebaQRPageRoutingModule } from './prueba-qr-routing.module';

import { PruebaQRPage } from './prueba-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebaQRPageRoutingModule
  ],
  declarations: [PruebaQRPage]
})
export class PruebaQRPageModule {}
