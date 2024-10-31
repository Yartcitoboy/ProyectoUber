import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuscarViajePageRoutingModule } from './buscar-viaje-routing.module';
import { BuscarViajePage } from './buscar-viaje.page';
import { ModalDetallesComponent } from './modal-detalles.component'; // Importar el modal
<<<<<<< HEAD

import { QrCodeModule } from 'ng-qrcode';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
=======
import { QrCodeModule } from 'ng-qrcode';
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarViajePageRoutingModule,
    QrCodeModule
  ],
<<<<<<< HEAD
  declarations: [BuscarViajePage, ModalDetallesComponent, BarcodeScanningModalComponent], // Declarar el modal aquí
=======
  declarations: [BuscarViajePage, ModalDetallesComponent], // Declarar el modal aquí
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
})
export class BuscarViajePageModule {}
