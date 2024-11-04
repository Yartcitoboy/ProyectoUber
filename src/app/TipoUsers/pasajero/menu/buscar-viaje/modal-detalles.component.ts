import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { Viaje } from 'src/app/interfaces/viaje';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
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
      <ion-button style="padding-top: 10px" expand="full" color="danger" (click)="reservarViaje()">
      
      <qr-code value="Hello world!" 
         size="140" 
         errorCorrectionLevel="M" />
      </ion-button>
    </ion-card-content>
  </ion-card>
  
</ion-content>


  `
})
export class ModalDetallesComponent implements OnInit {
    @Input() direccionActual?: string;
    @Input() direccionDestino?: string;
    @Input() costo?: number;
    @Input() cantidadPasajeros?: number;
    @Input() horario?: string;
    @Input() viajeId?: string;
    @Input() pasajerosReservados: string[] = []; 

  constructor(
    private modalController: ModalController, 
    private firestore: AngularFirestore, 
    private router: Router,
    private viajeService: ViajeService
  ) { }

  ngOnInit() {
    console.log('Modal inicializado con viajeId:', this.viajeId);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async reservarViaje() {
    console.log('Iniciando proceso de reserva...'); // Debug log
    
    if (!this.viajeId) {
      console.error('No hay ID de viaje');
      return;
    }

    try {
      console.log('Intentando reservar viaje con ID:', this.viajeId); // Debug log
      const resultado = await this.viajeService.reservarViaje(this.viajeId);
      console.log('Resultado de la reserva:', resultado);
      if (resultado) {
        console.log('Viaje reservado exitosamente');
        this.cerrarModal();
      }
    } catch (error) {
      console.error('Error al reservar:', error);
      // Aquí podrías mostrar un AlertController con el error
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

  reservarViaje1() {
    this.router.navigate(['/detalle-viaje']);
  }
  
}
