import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
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
        console.log('Viaje obtenido:', viaje);
        this.viajeSeleccionado = viaje;
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
}
