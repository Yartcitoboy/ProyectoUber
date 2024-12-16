import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  qrValue: string = '';
  viajeId: string = '';

  constructor(
    private route: ActivatedRoute,
    private viajeService: ViajeService,
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    // this.viajeId = this.route.snapshot.paramMap.get('viajeId') || '';
    // this.qrValue = `reservar-viaje/${this.viajeId}`;
  }

  // async scanQRCode() {
  //   try {
  //     const data = await this.barcodeScanner.scan();
  //     if (data.text) {
  //       const viajeId = data.text.split('/').pop();
  //       if (viajeId) {
  //         await this.reservarViaje(viajeId);
  //       }
  //     }
  //   } catch (error) {
  //     const alert = await this.alertController.create({
  //       header: 'Error',
  //       message: 'Error al escanear el código QR',
  //       buttons: ['OK'],
  //     });
  //     await alert.present();
  //   }
  // }

  // async reservarViaje(viajeId: string) {
  //   try {
  //     const resultado = await this.viajeService.reservarViaje(viajeId);
  //     if (resultado) {
  //       const alert = await this.alertController.create({
  //         header: 'Éxito',
  //         message: 'Viaje reservado correctamente',
  //         buttons: ['OK'],
  //       });
  //       await alert.present();
  //     }
  //   } catch (error) {
  //     const alert = await this.alertController.create({
  //       header: 'Error',
  //       message: 'Error al reservar el viaje',
  //       buttons: ['OK'],
  //     });
  //     await alert.present();
  //   }
  // }
}
