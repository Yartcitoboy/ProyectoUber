import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage {
  destino?: string;
  horaSalida?: string;
  costo?: number;

  constructor(private router: Router) {}

  onSubmit() {
    // Simula guardar el viaje programado
    console.log('Viaje programado:', {
      destino: this.destino,
      horaSalida: this.horaSalida,
      costo: this.costo,
    });

    // Navegar de vuelta a la página de inicio
    this.router.navigate(['/home']);
  }
}
