import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { MapService } from 'src/app/services/map-service.service'; 

@Component({
  selector: 'app-detalle-conductor',
  templateUrl: './detalle-conductor.page.html',
  styleUrls: ['./detalle-conductor.page.scss'],
})
export class DetalleConductorPage implements OnInit {
  direccionActual: string = '';
  direccionDestino: string = '';
  costo: string = '';
  cantidadPasajeros: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private mapService: MapService 
  ) {}

  ngOnInit() {}

  // Validar direccione

  // Verificar si el formulario es válido
  isFormValid(): boolean {
    return this.direccionActual !== '' && this.direccionDestino !== '' && this.costo !== '' && this.cantidadPasajeros !== '';
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
              const confirmationAlert = await this.alertController.create({
                header: 'Viaje Confirmado',
                message: `Tu viaje ha sido confirmado.`,
                cssClass: 'confirmation-alert',
                buttons: [
                  {
                    text: 'Ver QR',
                    handler: () => {
                      this.navCtrl.navigateForward('/qr');
                    },
                  },
                ],
              });
              await confirmationAlert.present();
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
}
