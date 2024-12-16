import { Component, OnInit , ViewChild} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, time, home } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { Viaje } from 'src/app/interfaces/viaje';


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

  viajes: Viaje[] = [];
  viajeSeleccionado?: Viaje;


  constructor(
    private menuController: MenuController ,
    private navCtrl: NavController,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
    private viajeService: ViajeService
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

    this.viajeService.obtenerViajes().subscribe(viajes => {
      this.viajes = viajes;

      if (this.viajes.length > 0) {
        this.viajeSeleccionado = this.viajes[0]; // Por ejemplo, selecciona el primer viaje
      }
    });

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

    this.firestore.collection('viajes').snapshotChanges().subscribe(actions => {
      this.viajes = actions.map(a => {
        const data = a.payload.doc.data() as Viaje;
        const documentId = a.payload.doc.id; // Obtén el ID del documento
        return { documentId, ...data }; // Combina el ID con los datos del viaje
      });
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

  verDetalles(viaje: Viaje) {
    console.log('Navegando a detalles del viaje con ID:', viaje.id); // Para depuración
    this.router.navigate(['/detalle-viaje', viaje.id]);
  }
};
  

  


  


