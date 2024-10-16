import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-detalleviaje-conductor',
  templateUrl: './detalleviaje-conductor.page.html',
  styleUrls: ['./detalleviaje-conductor.page.scss'],
})
export class DetalleviajeConductorPage implements OnInit {
  viajeId: string = '';
  viaje: Viaje | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viajeService: ViajeService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.viajeId = params['viajeId'];  // Captura el viajeId
      console.log('viajeId obtenido:', this.viajeId);  // Para verificar si se obtuvo correctamente

      if (this.viajeId) {
        this.obtenerDetallesViaje();  // Llama a este método si el ID es válido
      } else {
        console.error('No se ha proporcionado un viajeId.');  // Maneja el caso en que no se obtiene el ID
      }
    });
  }
  
  
  

  async obtenerDetallesViaje() {
    try {
      const viaje = await this.viajeService.obtenerViajePorId(this.viajeId).toPromise();
      console.log('Detalles del viaje:', viaje); // Verifica si se obtienen los detalles
      this.viaje = viaje;
    } catch (error) {
      console.error('Error al obtener los detalles del viaje:', error);
    }
  }

  verDetallesViaje(viajeId: string) {
    this.router.navigate(['/detalleviaje-conductor'], {
      queryParams: { viajeId: viajeId }
    });
  }
  
  
  

  confirmarViaje() {
    if (this.viaje) {
      this.viajeService.confirmarViaje(this.viaje.id);
    }
  }
}
