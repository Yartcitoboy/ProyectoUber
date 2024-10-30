import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  qrValue = '';
  resultadoQR = '';

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then()
      BarcodeScanner.checkPermissions().then()
      BarcodeScanner.removeAllListeners();
    }
    // OBTENEMOS EL UID DEL USUARIO LOGEADO Y LO ASIGNAMOS AL QR
    this.authService.isLogged().subscribe(user=> {
      this.qrValue = user.uid;
    });
  }

  async openCamera() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanner-modal',
      showBackdrop: false,
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

}
