import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-detalle-conductor',
  templateUrl: './detalle-conductor.page.html',
  styleUrls: ['./detalle-conductor.page.scss'],
})
export class DetalleConductorPage implements OnInit {
  direccionActual: string = '';
  direccionDestino: string = '';
  costo: number = 0;
  cantidadPasajeros: number = 0;
  horario: string = ''; 
  conductorId: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private viajeService: ViajeService,
    private firestore: AngularFirestore,
    private authService: AngularFireAuth
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
          this.conductorId = user.uid;
      }
    });
  }

  isFormValid(): boolean {
    return this.direccionActual !== '' && this.direccionDestino !== '' && this.costo > 0 && this.cantidadPasajeros > 0;
  }

  onHorarioChange(event: any) {
    this.horario = event.detail.value;
  }

  async showConfirmation() {
    if (this.isFormValid()) {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: `¿Estás seguro de que deseas confirmar esta ruta?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Confirmar',
            handler: async () => {
              await this.crearViaje();
            },
          },
        ],
      });
      await alert.present();
    } else {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos requeridos antes de continuar.',
        buttons: ['OK'],
      });
      await errorAlert.present();
    }
  }

  async crearViaje() {
    const viajeActivo = await this.viajeService.verificarViajeActivo(this.conductorId);

    if (viajeActivo) {
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Ya tienes un viaje activo. Por favor, completa ese viaje antes de crear uno nuevo.',
        buttons: ['OK'],
      });
      await errorAlert.present();
    } else {
      const nuevoViaje: Viaje = {
        id: this.firestore.createId(),
        direccionActual: this.direccionActual,
        direccionDestino: this.direccionDestino,
        costo: this.costo,
        cantidadPasajeros: this.cantidadPasajeros,
        horario: this.horario,
        pasajerosReservados: [],
        conductorId: this.conductorId,
        estado: 'disponible',
      };

      try {
        await this.viajeService.agregarViaje(nuevoViaje);
        const confirmationAlert = await this.alertController.create({
          header: 'Viaje Confirmado',
          message: `Tu viaje ha sido confirmado.`,
          buttons: [
            {
              text: 'Ver Detalles',
              handler: () => {
                this.navCtrl.navigateForward(`/detalleviaje-conductor`, {
                  queryParams: { viajeId: nuevoViaje.id }
                });
              },
            },
          ],
        });
        await confirmationAlert.present();
      } catch (error) {
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al confirmar el viaje. Por favor, inténtalo nuevamente.',
          buttons: ['OK'],
        });
        await errorAlert.present();
      }
    }
  }
}
