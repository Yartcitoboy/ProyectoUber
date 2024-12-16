import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, AlertController } from '@ionic/angular';
import { Viaje } from 'src/app/interfaces/viaje';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-modal-detalles',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="dark-custom">
        <ion-title class="ion-text-center">
          <strong>Detalles del Viaje</strong>
        </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrarModal()" color="light">
            <ion-icon name="close-outline" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding custom-content">
      <ion-card class="custom-card">
        <ion-card-header>
          <ion-card-title class="ion-text-center title-with-icon">
            <ion-icon name="map-outline" class="icon-large"></ion-icon>
            Información de Ruta
          </ion-card-title>
        </ion-card-header>
        
        <ion-card-content>
          <ion-list lines="none">
            <ion-item class="custom-item">
              <ion-icon name="location-outline" slot="start" color="warning"></ion-icon>
              <ion-label>
                <h2 class="item-title">Origen</h2>
                <p class="item-content">{{ direccionActual }}</p>
              </ion-label>
            </ion-item>

            <ion-item class="custom-item">
              <ion-icon name="navigate-outline" slot="start" color="warning"></ion-icon>
              <ion-label>
                <h2 class="item-title">Destino</h2>
                <p class="item-content">{{ direccionDestino }}</p>
              </ion-label>
            </ion-item>

            <ion-item class="custom-item">
              <ion-icon name="cash-outline" slot="start" color="warning"></ion-icon>
              <ion-label>
                <h2 class="item-title">Costo del Viaje</h2>
                <p class="item-content">$ {{ costo }}</p>
              </ion-label>
            </ion-item>

            <ion-item class="custom-item">
              <ion-icon name="people-outline" slot="start" color="warning"></ion-icon>
              <ion-label>
                <h2 class="item-title">Pasajeros</h2>
                <p class="item-content">{{ cantidadPasajeros }} personas</p>
              </ion-label>
            </ion-item>

            <ion-item class="custom-item">
              <ion-icon name="time-outline" slot="start" color="warning"></ion-icon>
              <ion-label>
                <h2 class="item-title">Horario</h2>
                <p class="item-content">{{ horario }}</p>
              </ion-label>
            </ion-item>
          </ion-list>

          <div class="button-container">

            <ion-button expand="block" 
                      class="custom-button"
                      (click)="reservarViaje()">
              <ion-icon name="car-outline" slot="start"></ion-icon>
              Reservar Viaje
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [`
    :host {
      --ion-color-dark-custom: #1A1A1A;
      --ion-color-warning: #FFB800;
    }

    .custom-content {
      --background: #1A1A1A;
    }

    .custom-card {
      margin: 8px;
      border-radius: 20px;
      background: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .icon-large {
      font-size: 28px;
      vertical-align: middle;
      margin-right: 8px;
      color: #FFB800;
    }

    .title-with-icon {
      font-size: 1.3rem;
      font-weight: bold;
      color: #1A1A1A;
      padding: 16px 0;
    }

    .custom-item {
      --background: transparent;
      --padding-start: 16px;
      --padding-end: 16px;
      --padding-top: 12px;
      --padding-bottom: 12px;
      margin-bottom: 8px;
    }

    .item-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1A1A1A;
      margin-bottom: 4px;
    }

    .item-content {
      font-size: 1rem;
      color: #1A1A1A;
      opacity: 0.8;
    }

    ion-icon[slot="start"] {
      font-size: 24px;
      margin-right: 16px;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 24px 0 12px;
    }

    .custom-button {
      margin: 0;
      --background: #FFB800;
      --color: #1A1A1A;
      --border-radius: 12px;
      --padding-top: 16px;
      --padding-bottom: 16px;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .map-button {
      --background: #1A1A1A;
      --color: #FFFFFF;
    }

    @media (max-width: 360px) {
      .custom-card {
        margin: 4px;
      }

      .item-title {
        font-size: 1rem;
      }

      .item-content {
        font-size: 0.9rem;
      }

      ion-icon[slot="start"] {
        font-size: 20px;
        margin-right: 12px;
      }

      .button-container {
        gap: 8px;
      }
    }
  `]
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
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private router: Router,
    private viajeService: ViajeService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit() {
    console.log('Modal inicializado con viajeId:', this.viajeId);
    
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async reservarViaje() {
    try {
      const userId = (await this.auth.currentUser)?.uid;
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }

      const tieneReserva = await this.viajeService.verificaReservaViaje(userId);
      if (tieneReserva) {
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'Ya tienes una reserva activa. No puedes reservar otro viaje.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const viajeReservado = await this.viajeService.verificaReservaViaje(this.viajeId!);
      if (viajeReservado) {
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'Este viaje ya tiene reservas. No puedes reservarlo.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const resultado = await this.viajeService.reservarViaje(this.viajeId!, userId);
      if (resultado) {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Viaje reservado correctamente',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.router.navigate(['/detalle-viaje', resultado]);
            }
          }]
        });
        await alert.present();
        this.cerrarModal();
      }
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message || 'Error al reservar el viaje',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async cancelarReserva() {
    try {
      const userId = (await this.auth.currentUser)?.uid;
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }
  
      const resultado = await this.viajeService.cancelarReserva(this.viajeId!, userId);
      if (resultado) {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Reserva cancelada correctamente',
          buttons: ['OK']
        });
        await alert.present();
        this.cerrarModal();
      }
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message || 'Error al cancelar la reserva',
        buttons: ['OK']
      });
      await alert.present();
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
