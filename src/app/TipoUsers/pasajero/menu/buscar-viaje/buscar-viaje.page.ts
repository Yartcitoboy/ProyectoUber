import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ModalController, Platform } from '@ionic/angular';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
=======
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { ModalController } from '@ionic/angular';
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
import { ModalDetallesComponent } from './modal-detalles.component'; // Asegúrate de importar el modal

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

<<<<<<< HEAD
  qrValue = '';
  resultadoQR = '';

=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
  viajes: Viaje[] = [];
  viajesFiltrados: Viaje[] = [];
  segment: string = 'disponibles'; // Estado inicial del segmento

  constructor(
    private viajeService: ViajeService,
    private modalController: ModalController, // Modal Controller de Ionic
<<<<<<< HEAD
    private authService: AuthService,
    private platform: Platform,
    private router: Router
=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
  ) { }

  ngOnInit() {
    this.viajeService.obtenerViajes().subscribe(viajes => {
      this.viajes = viajes; // Filtra viajes disponibles
      this.filtrarViajes(); // Filtra los viajes al inicio
    });
<<<<<<< HEAD

    if (this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then()
      BarcodeScanner.checkPermissions().then()
      BarcodeScanner.removeAllListeners();
    }
    // OBTENEMOS EL UID DEL USUARIO LOGEADO Y LO ASIGNAMOS AL QR
    this.authService.isLogged().subscribe((user: any) => {
      this.qrValue = user.uid;
    });
=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
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
<<<<<<< HEAD

  async openCamera() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanner-modal',
      showBackdrop: false,
      backdropDismiss: false,
      componentProps: {
        formats: [],
        LensFacing: LensFacing.Back
      }
    });

    await modal.present();

    // DESPUES DE LEER EL QR
    const { data } = await modal.onDidDismiss();

    // SI SE OBTIENE INFORMACION EN DATA
    if (data?.barcode?.displayValue) {
      // COLOCAR LA LOGICA DE SU PROYECTO
      // EN MI CASO LO MANDARE A OTRA PAGINA
      this.resultadoQR = data.barcode.displayValue;
      
      setTimeout(()=>{
        this.router.navigate(['/prueba-qr', this.resultadoQR])
      }, 1000);
    }
  }
=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
}
