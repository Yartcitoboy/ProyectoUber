import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, time, qrCode } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usuarioLogin?: string;

  constructor(
    private menuController: MenuController
  ) {
    addIcons({ person, time, qrCode})
   }

  ngOnInit() {
    this.menuController.enable(false);
    this.usuarioLogin = localStorage.getItem('usuarioLogin') || '';
  }

}