import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalleviaje-conductor',
  templateUrl: './detalleviaje-conductor.page.html',
  styleUrls: ['./detalleviaje-conductor.page.scss'],
})
export class DetalleviajeConductorPage implements OnInit {
  viajeSeleccionado: Viaje | undefined;
  viajeId: string = '';

  

  constructor(
    private route: ActivatedRoute,
    private viajeService: ViajeService,
    private navCtrl: NavController,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    console.log('Iniciando DetalleviajeConductorPage');
    this.route.params.subscribe(params => {
      this.viajeId = params['viajeId'];
      console.log('ID del viaje recibido:', this.viajeId);

      if (this.viajeId) {
        this.cargarDetallesViaje();
      } else {
        console.error('No se recibió ID del viaje');
      }
    });
    
  }

  cargarDetallesViaje() {
    this.viajeService.obtenerViajePorId(this.viajeId).subscribe(
      viaje => {
        if (viaje) {
          this.viajeSeleccionado = viaje;
          console.log('Detalles del viaje:', {
            asientosDisponibles: viaje.cantidadPasajeros,
            pasajerosReservados: viaje.pasajerosReservados,
            totalReservas: viaje.pasajerosReservados?.length || 0
          });
        }
      },
      error => {
        console.error('Error al cargar el viaje:', error);
      }
    );
  }

  async cancelarViaje() {
    try {
      await this.viajeService.cancelarViaje(this.viajeId);
      console.log('Viaje cancelado exitosamente');
      this.navCtrl.navigateBack('/conductor-dashboard');
    } catch (error) {
      console.error('Error al cancelar el viaje:', error);
    }
  }

  async comenzarViaje() {
    const alert = await this.alertController.create({
      header: 'Información',
      message: 'Función en desarrollo',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para obtener el total de asientos originales
  getTotalAsientosOriginales(): number {
    if (!this.viajeSeleccionado) return 0;
    return this.viajeSeleccionado.cantidadPasajeros + 
           (this.viajeSeleccionado.pasajerosReservados?.length || 0);
  }

  
}
