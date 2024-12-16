import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';


import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';


@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {

  qrValue = '';
  resultadoQR = '';
  viajeId: string | undefined;


  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private platform: Platform,
    private auth: AngularFireAuth,
    private alertController: AlertController,
    private viajeService: ViajeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    if (this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then()
      BarcodeScanner.checkPermissions().then()
      BarcodeScanner.removeAllListeners();
    }
    // OBTENEMOS EL UID DEL USUARIO LOGEADO Y LO ASIGNAMOS AL QR
    this.authService.isLogged().subscribe((user: any) => {
      this.qrValue = user.uid;
    });

    this.menuController.enable(true);
    
    this.viajeId = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID de viaje:', this.viajeId);
    if (!this.viajeId) {
      console.error('ID de viaje no encontrado en la ruta');
      // Aquí puedes redirigir o mostrar un mensaje de error
    }
    
  }

  async openCamera() {
    const modal = await this.modalCtrl.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      backdropDismiss: false,
      componentProps: {
        formats: [],
        lensFacing: LensFacing.Back
      },
      mode: 'ios'
    });

    document.body.classList.add('barcode-scanning-active');
    await modal.present();

    const { data } = await modal.onDidDismiss();
    document.body.classList.remove('barcode-scanning-active');

    if (data?.barcode?.displayValue) {
      this.resultadoQR = data.barcode.displayValue;
      setTimeout(() => {
        this.router.navigate(['/prueba-qr', this.resultadoQR]);
      }, 1000);
    }
  }

  async cancelarReserva() {
    try {
      const userId = (await this.auth.currentUser)?.uid;
      if (!userId) {
        throw new Error('Usuario no autenticado');
      }

      if (!this.viajeId) {
        throw new Error('ID de viaje no disponible');
      }

      const resultado = await this.viajeService.cancelarReserva(this.viajeId, userId);
      if (resultado) {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Reserva cancelada correctamente',
          buttons: ['OK']
        });
        await alert.present();
        // Aquí puedes redirigir o actualizar la vista según sea necesario
      }
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message || 'Error al cancelar la reserva',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  
  

}
