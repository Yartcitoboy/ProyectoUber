import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-modal-detalles',
  template: `

<ion-header>
  <ion-toolbar>
    <ion-title>Detalles del Viaje</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="cerrarModal()">Cerrar</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Ruta</ion-card-title>
    </ion-card-header>
    <ion-card-content>
    <p><strong></strong> {{ direccionActual }}</p>
    <p><strong></strong> {{ direccionDestino }}</p>
      <p><strong></strong> {{ costo }}</p>
      <p><strong>Cantidad de Pasajeros:</strong> {{ cantidadPasajeros }}</p>
      <p><strong>Horario:</strong> {{ horario }}</p>
      <ion-button style="padding-top: 10px" expand="full" color="primary" (click)="reservarViaje()">
        Reservar Viaje
      </ion-button>
    </ion-card-content>
  </ion-card>
</ion-content>


  `
})
export class ModalDetallesComponent {
    @Input() direccionActual?: string;
    @Input() direccionDestino?: string;
    @Input() costo?: number;
    @Input() cantidadPasajeros?: number;
    @Input() horario?: string;
    @Input() viajeId?: string;
    @Input() pasajerosReservados: string[] = []; 

  constructor(private modalController: ModalController, private firestore: AngularFirestore) { }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async reservarViaje() {
    if (this.cantidadPasajeros) {
      const viajeRef = this.firestore.collection('viajes').doc(this.viajeId);
      const asientosDisponibles = this.cantidadPasajeros - 1;

      if (asientosDisponibles >= 0) {
        await viajeRef.update({ cantidadPasajeros: asientosDisponibles, pasajerosReservados: this.pasajerosReservados });
      }

      // Actualiza la lista de pasajeros reservados
      this.pasajerosReservados.push('nuevoPasajeroId'); // Aquí debes usar el ID del pasajero

      if (asientosDisponibles === 0) {
        await viajeRef.update({ estado: 'no disponible' });
      }

      this.cerrarModal();
    }
  }

  async mostrarDetalles(viaje: Viaje) {
    const modal = await this.modalController.create({
      component: ModalDetallesComponent,
      componentProps: {
        direccionActual: viaje.direccionActual,
        direccionDestino: viaje.direccionDestino,
        costo: viaje.costo,
        cantidadPasajeros: viaje.cantidadPasajeros,
        horario: viaje.horario,
        viajeId: viaje.id // Asegúrate de pasar el ID del viaje
      }
    });
    return await modal.present();
  }
  
}
