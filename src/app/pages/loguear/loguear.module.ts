import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoguearPageRoutingModule } from './loguear-routing.module';

import { LoguearPage } from './loguear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoguearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoguearPage]
})
export class LoguearPageModule {}
