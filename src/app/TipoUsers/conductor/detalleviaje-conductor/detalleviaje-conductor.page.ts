import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-detalleviaje-conductor',
  templateUrl: './detalleviaje-conductor.page.html',
  styleUrls: ['./detalleviaje-conductor.page.scss'],
})
export class DetalleviajeConductorPage implements OnInit {
  viaje: any; // o define una interfaz Viaje más específica
  conductorInfo: any;

  constructor(
    private route: ActivatedRoute,
    private viajeService: ViajeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Obtener el ID del viaje de los parámetros de la ruta
    this.route.params.subscribe(params => {
      const viajeId = params['id'];
      
      // Obtener los detalles del viaje
      this.viajeService.obtenerViajes().subscribe((viajes: any) => {
        this.viaje = viajes.find((v: any) => v.id === viajeId);
        
        // Obtener información del conductor si es necesario
        if (this.viaje.conductorId) {
          this.authService.obtenerInfoUsuario(this.viaje.conductorId).subscribe((conductor: any) => {
            this.conductorInfo = conductor;
          });
        }
      });
    });
  }
}
