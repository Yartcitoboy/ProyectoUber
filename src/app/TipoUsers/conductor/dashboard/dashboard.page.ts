import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(IonMenu) menu?: IonMenu;
  selectedSegment: string = 'default';

  viajeId?: string;

  // private map?: GoogleMap;
  public emailUsuario?: string;
  public tipoUsuario?: string;
  public nombreUsuario?: string;
  public apellidoUsuario?: string;

  constructor(
    private menuController: MenuController,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private viajeService: ViajeService,
    private alertController: AlertController
  ) {
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

  verDetalleViaje(viajeId: string) {
    this.router.navigate(['/detalleviaje-conductor', viajeId]);
  }

  async verViaje() {
    try {
      const user = await this.fireAuth.currentUser;
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      this.viajeService.obtenerViajePorConductor(user.uid).subscribe(
        viaje => {
          if (viaje) {
            // Si existe un viaje, navegar a los detalles
            this.router.navigate(['/detalleviaje-conductor', viaje.id]);
          } else {
            // Si no existe viaje, mostrar alerta
            this.mostrarAlertaSinViaje();
          }
        },
        error => {
          console.error('Error al obtener viaje:', error);
          this.mostrarAlertaSinViaje();
        }
      );
    } catch (error) {
      console.error('Error:', error);
      this.mostrarAlertaSinViaje();
    }
  }

  private async mostrarAlertaSinViaje() {
    const alert = await this.alertController.create({
      header: 'Sin viajes',
      message: 'No tienes ningún viaje creado actualmente',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/dashboard']);
        }
      }]
    });
    await alert.present();
  }
};



// config() {
//   this.usuarios = this.usuarioService.getUsuario();
// }

