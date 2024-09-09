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
    console.log('Viaje programado:', {
      destino: this.destino,
      horaSalida: this.horaSalida,
      costo: this.costo,
    });

    this.router.navigate(['/home']);
  }
}
