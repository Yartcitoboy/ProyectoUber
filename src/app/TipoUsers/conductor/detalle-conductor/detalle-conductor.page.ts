import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { MapService } from 'src/app/services/map-service.service'; // Asegúrate de que esta ruta sea correcta

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
    private mapService: MapService // Inyección del servicio
  ) {}

  ngOnInit() {}

  // Validar direcciones
  async validateAddress(address: string): Promise<boolean> {
    // Implementa tu lógica de validación aquí
    const response = await fetch(`https://api.tu-validacion-de-direccion.com/validate?address=${encodeURIComponent(address)}`);
    const data = await response.json();
    return data.valid; // Asumiendo que tu API retorna un objeto con una propiedad 'valid'
  }

  // Verificar si el formulario es válido
  isFormValid(): boolean {
    return this.direccionActual !== '' && this.direccionDestino !== '' && this.costo !== '' && this.cantidadPasajeros !== '';
  }

  async showConfirmation() {
    // Validar direcciones
    const isCurrentAddressValid = await this.validateAddress(this.direccionActual);
    const isDestinationAddressValid = await this.validateAddress(this.direccionDestino);
  
    if (!isCurrentAddressValid || !isDestinationAddressValid) {
      const errorAlert = await this.alertController.create({
        header: 'Error de Validación',
        message: 'Una o ambas direcciones ingresadas no son válidas.',
        buttons: ['OK'],
      });
      await errorAlert.present();
      return;
    }
  
    // Verificar si el formulario es válido
    if (this.isFormValid()) {
      // Llama a la función para trazar la ruta usando el servicio
      await this.mapService.trazarRuta(this.direccionActual, this.direccionDestino); // Suponiendo que este método está definido en tu servicio
      
      // Mostrar alerta de confirmación
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
              // Si se confirma, mostrar la alerta de viaje confirmado
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
      // Mostrar alerta indicando que los campos son requeridos
      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos requeridos antes de continuar.',
        buttons: ['OK'],
      });
  
      await errorAlert.present();
    }
  }
}
