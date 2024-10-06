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

<<<<<<< HEAD
<<<<<<< HEAD
  public appPages: Page[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;

  usuarioLogin?: string;
=======
>>>>>>> rama_isa
=======
>>>>>>> rama_isa

  constructor(
    private menuController: MenuController , private navCtrl: NavController
  ) { 
    addIcons({ person, time, home})
  }

  ngOnInit() {
<<<<<<< HEAD
<<<<<<< HEAD
    this.menuController.enable(false);
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.usuarioLogin = user.email || '';
      this.configSideMenu();
    } else {
      
=======
    
    
>>>>>>> rama_isa
=======
    
    
>>>>>>> rama_isa
    }
  

  irABuscarViaje() {
    console.log('Navegando a la página de Buscar Viaje');
    this.navCtrl.navigateRoot('/pasajero-buscar-viaje');
  }

<<<<<<< HEAD
=======

  
>>>>>>> rama_isa

  

}