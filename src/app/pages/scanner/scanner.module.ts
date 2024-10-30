import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPageRoutingModule } from './scanner-routing.module';

import { ScannerPage } from './scanner.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule,
    QrCodeModule
  ],
  declarations: [ScannerPage, BarcodeScanningModalComponent]
})
export class ScannerPageModule {}
