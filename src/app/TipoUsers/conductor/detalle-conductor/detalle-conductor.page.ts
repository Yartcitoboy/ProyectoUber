import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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
    private router: Router,
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
        buttons: [
      {
        text: 'OK',
        handler: () => {
          // Redirige a una página específica, por ejemplo, el menú del conductor
          this.navCtrl.navigateForward('/menu-conductor');
        }
      }
    ]
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
      console.log('ID generado:', nuevoViaje.id);  // Para verificar el ID

      try {
        await this.viajeService.agregarViaje(nuevoViaje);
        const confirmationAlert = await this.alertController.create({
          header: 'Viaje Confirmado',
          message: `Tu viaje ha sido confirmado.`,
          buttons: [
            {
              text: 'Ver Detalles',
              handler: () => {
                console.log('ID del viaje a navegar:', nuevoViaje.id);
                if (nuevoViaje && nuevoViaje.id) {
                  this.router.navigate(['/detalleviaje-conductor', nuevoViaje.id]);
                } else {
                  console.error('No se pudo obtener el ID del viaje');
                  // Mostrar una alerta al usuario
                }
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
  limpiarFormulario() {
    this.direccionActual = '';
    this.direccionDestino = '';
    this.costo = 0;
    this.cantidadPasajeros = 0;
    this.horario = '';
  }
}
