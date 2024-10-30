import { Component, OnInit , ViewChild} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, time, home } from 'ionicons/icons';
import { Page } from 'src/app/interfaces/page';
import { NavController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(IonMenu) menu?: IonMenu;
  selectedSegment: string = 'default';
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellidoUsuario?: string;
  public tipoUsuario?: string;

  usuarioLogin?: string;

  constructor(
    private menuController: MenuController ,
    private navCtrl: NavController,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) { 
    addIcons({ person, time, home})
  }

  logout() {
    // TODO: ALERTA FUNCIONANDO
    this.authService.logout();
    this.router.navigate(['/loguear']);
  }

  ngOnInit() {
    this.menuController.enable(true);

    // this.map = await GoogleMap.create({
    //   id: 'my-map',
    //   element: document.getElementById('map') as HTMLElement,
    //   apiKey: 'AIzaSyBGtiLWSXcSGoNfIS1x7PwrX4aDD9yT9mo',
    //   config: {
    //     center: { lat: 37.7749, lng: -122.4194 },
    //     zoom: 10,
    //   },
    // });
    this.authService.isLogged().subscribe((user: any) => {
      if (user) {
        this.emailUsuario = user.email;
        this.obtenerDatosUsuario(user.uid);
        this.obtenerTipoUsuario(user.uid);
      } else {
        this.navCtrl.navigateRoot('/loguear');
      }
    });
  }

  async obtenerTipoUsuario(uid: string) {
    this.firestore.collection('usuarios').doc(uid).get().toPromise()
      .then((doc) => {
        if (doc && doc.exists) {
          this.tipoUsuario = (doc.data() as { tipo: string })?.tipo;
        }
      });
  }
  async obtenerDatosUsuario(uid: string) {
    try {
      const doc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
      if (doc && doc.exists) {
        const userData = doc.data() as { nombre?: string, apellido?: string };
        this.nombreUsuario = userData.nombre || 'Nombre desconocido';
        this.apellidoUsuario = userData.apellido || 'Apellido desconocido';
      } else {
  
        this.nombreUsuario = 'Usuario';
        this.apellidoUsuario = 'Desconocido';
      }
    } catch (error) {
      this.nombreUsuario = 'Error';
      this.apellidoUsuario = 'al cargar datos';
    }
  }
  
  irABuscarViaje() {
    console.log('Navegando a la página de Buscar Viaje');
    this.navCtrl.navigateRoot('/pasajero-buscar-viaje');
  }
};
  

  


  


