import { Component, OnInit } from '@angular/core';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { ModalController } from '@ionic/angular';
import { ModalDetallesComponent } from './modal-detalles.component'; // Asegúrate de importar el modal

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

  viajes: Viaje[] = [];
  viajesFiltrados: Viaje[] = [];
  segment: string = 'disponibles'; // Estado inicial del segmento

  constructor(
    private viajeService: ViajeService,
    private modalController: ModalController, // Modal Controller de Ionic
  ) { }

  ngOnInit() {
    this.viajeService.obtenerViajes().subscribe(viajes => {
      this.viajes = viajes; // Filtra viajes disponibles
      this.filtrarViajes(); // Filtra los viajes al inicio
    });
  }

  cambiarSegmento(event: any) {
    this.segment = event.detail.value;
    this.filtrarViajes();
  }

  // Mostrar modal con los detalles del viaje
  async mostrarDetalles(viaje: Viaje) {
    const modal = await this.modalController.create({
      component: ModalDetallesComponent,
      componentProps: {
        direccionActual: viaje.direccionActual,
        direccionDestino: viaje.direccionDestino,
        costo: viaje.costo,
        cantidadPasajeros: viaje.cantidadPasajeros,
        horario: viaje.horario,
        viajeId: viaje.id,
        pasajerosReservados: viaje.pasajerosReservados || []
      }
    });
    return await modal.present();
  }

  filtrarViajes() {
    if (this.segment === 'disponibles') {
      this.viajesFiltrados = this.viajes.filter(viaje => viaje.cantidadPasajeros > 0);
    } else {
      this.viajesFiltrados = this.viajes.filter(viaje => viaje.cantidadPasajeros <= 0);
    }
  }
}
