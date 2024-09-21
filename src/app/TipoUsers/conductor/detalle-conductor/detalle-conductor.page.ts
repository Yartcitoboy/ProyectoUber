import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

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

  isFormValid(): boolean {
    return this.direccionActual !== '' && this.direccionDestino !== '' && this.costo !== '' && this.cantidadPasajeros !== '';
  }

  constructor(private alertController: AlertController, private navCtrl: NavController) { }
    async showConfirmation() {
    // Verificar si el formulario es válido
    if (this.isFormValid()) {
      // Mostrar alerta de confirmación
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Estás seguro de que deseas confirmar esta ruta?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Confirmar',
            handler: async () => {
              // Si se confirma, mostrar la alerta de viaje confirmado
              const confirmationAlert = await this.alertController.create({
                header: 'Viaje Confirmado',
                message: `Tu viaje ha sido confirmado.`,
                cssClass: 'confirmation-alert',
                buttons: [
                  {
                    text: 'Ver QR',
                    handler: () => {
                      this.navCtrl.navigateForward('/ruta-del-qr');
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
      // Opcional: Puedes mostrar una alerta indicando que los campos son requeridos
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos requeridos antes de continuar.',
        buttons: ['OK'],
      });
  
      await errorAlert.present();
    }
  }
  

  ngOnInit() {
  }

}
