import { Component, OnInit , ViewChild} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, time, home } from 'ionicons/icons';
import { Page } from 'src/app/interfaces/page';
import { NavController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(IonMenu) menu?: IonMenu;
  selectedSegment: string = 'default';


  constructor(
    private menuController: MenuController , private navCtrl: NavController
  ) { 
    addIcons({ person, time, home})
  }

  ngOnInit() {
    
    
    }
  

  irABuscarViaje() {
    console.log('Navegando a la página de Buscar Viaje');
    this.navCtrl.navigateRoot('/pasajero-buscar-viaje');
  }


  

}
