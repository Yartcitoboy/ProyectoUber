import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenplashPageRoutingModule } from './screenplash-routing.module';

import { ScreenplashPage } from './screenplash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenplashPageRoutingModule
  ],
  declarations: [ScreenplashPage]
})
export class ScreenplashPageModule {}
