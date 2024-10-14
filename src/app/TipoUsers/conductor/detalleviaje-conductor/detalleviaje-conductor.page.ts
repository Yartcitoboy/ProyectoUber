import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private viajeService: ViajeService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.viajeId = params['viajeId'];
      this.obtenerDetallesViaje();
    });
  }

  async obtenerDetallesViaje() {
    this.viaje = await this.viajeService.obtenerViajePorId(this.viajeId).toPromise();
  }
  confirmarViaje() {
    if (this.viaje) {
      this.viajeService.confirmarViaje(this.viaje.id);
    }
  }
}
