import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, time, home } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private menuController: MenuController
  ) {
    addIcons({ person, time, home})
   }

  ngOnInit() {
    this.menuController.enable(true);
  }

  

}
