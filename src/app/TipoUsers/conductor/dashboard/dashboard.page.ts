import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/firebase/viaje.service';
=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(IonMenu) menu?: IonMenu;
  selectedSegment: string = 'default';

<<<<<<< HEAD
  viajeId?: string;

=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
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
<<<<<<< HEAD
    private router: Router,
    private viajeService: ViajeService
=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
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
<<<<<<< HEAD

  verDetalleViaje(viajeId: string) {
    this.router.navigate(['/detalleviaje-conductor', viajeId]);
  }

  async verViaje() {
    try {
      console.log('Iniciando verViaje()');
      const user = await this.authService.getCurrentUser();
      console.log('Usuario actual:', user);
      
      if (user) {
        this.viajeService.obtenerViajePorConductor(user.uid).subscribe(
          viaje => {
            console.log('Viaje obtenido:', viaje);
            if (viaje && viaje.id) {
              console.log('Navegando a detalles del viaje:', viaje.id);
              this.router.navigate(['/detalleviaje-conductor', viaje.id]);
            } else {
              console.log('No se encontró ningún viaje activo');
              // Mostrar alerta al usuario
              alert('No tienes viajes activos en este momento');
            }
          },
          error => {
            console.error('Error al obtener el viaje:', error);
            alert('Error al obtener el viaje');
          }
        );
      } else {
        console.log('No hay usuario autenticado');
        alert('Por favor, inicia sesión nuevamente');
      }
    } catch (error) {
      console.error('Error en verViaje():', error);
      alert('Ocurrió un error al verificar el viaje');
    }
  }
=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
};



// config() {
//   this.usuarios = this.usuarioService.getUsuario();
// }

