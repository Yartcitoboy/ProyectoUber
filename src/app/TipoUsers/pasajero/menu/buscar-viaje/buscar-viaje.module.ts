import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuscarViajePageRoutingModule } from './buscar-viaje-routing.module';
import { BuscarViajePage } from './buscar-viaje.page';
import { ModalDetallesComponent } from './modal-detalles.component'; // Importar el modal

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarViajePageRoutingModule
  ],
  declarations: [BuscarViajePage, ModalDetallesComponent], // Declarar el modal aquí
})
export class BuscarViajePageModule {}
