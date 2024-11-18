import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleViajePageRoutingModule } from './detalle-viaje-routing.module';


import { DetalleViajePage } from './detalle-viaje.page';
import { QrCodeModule } from 'ng-qrcode';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleViajePageRoutingModule,
    QrCodeModule
  ],
  declarations: [DetalleViajePage, BarcodeScanningModalComponent]
})
export class DetalleViajePageModule {}
