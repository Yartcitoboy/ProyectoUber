import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalleviaje-conductor',
  templateUrl: './detalleviaje-conductor.page.html',
  styleUrls: ['./detalleviaje-conductor.page.scss'],
})
export class DetalleviajeConductorPage implements OnInit {
  viaje: Viaje | undefined;
  viajeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private viajeService: ViajeService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.viajeId = params.get('viajeId');
      console.log('ID del viaje recibido:', this.viajeId);  // Esto debería mostrar un ID real.
      if (this.viajeId) {
        this.cargarDetallesViaje();
      } else {
        this.mostrarAlerta('Error', 'No se proporcionó ID de viaje');
      }
    });
    
  }

  cargarDetallesViaje() {
    if (this.viajeId) {
      console.log('Intentando cargar viaje con ID:', this.viajeId);
      this.viajeService.obtenerViajePorId(this.viajeId).subscribe({
        next: (viaje) => {
          console.log('Viaje recibido:', viaje);
          if (viaje) {
            this.viaje = viaje;
          } else {
            this.mostrarAlerta('Error', 'No se encontró el viaje especificado');
          }
        },
        error: (error) => {
          console.error('Error al cargar el viaje:', error);
          this.mostrarAlerta('Error', 'Error al cargar el viaje: ' + error.message);
        }
      });
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  
}
