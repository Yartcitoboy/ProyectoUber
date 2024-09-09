import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Viaje {
  destino: string;
  horaSalida: string;
  costo: number;
}

@Component({
  selector: 'app-pedir-viaje',
  templateUrl: './pedir-viaje.page.html',
  styleUrls: ['./pedir-viaje.page.scss'],
})
export class PedirViajePage implements OnInit {
  viajes = [
    { destino: 'Calle 123, Puente Alto', horaSalida: '18:00', costo: 1500 },
    { destino: 'Calle 456, La Florida', horaSalida: '18:30', costo: 2000 },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  seleccionarViaje(viaje: Viaje) {
    console.log('Viaje seleccionado:', viaje);

    this.router.navigate(['/home']);
  }
}
