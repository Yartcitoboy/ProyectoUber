import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditViajePageRoutingModule } from './edit-viaje-routing.module';

import { EditViajePage } from './edit-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditViajePageRoutingModule
  ],
  declarations: [EditViajePage]
})
export class EditViajePageModule {}
