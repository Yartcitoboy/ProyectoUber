import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ModalController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';


import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {

  qrValue = '';
  resultadoQR = '';


  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private platform: Platform,
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

  
  

}
