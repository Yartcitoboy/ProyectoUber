import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  map!: google.maps.Map;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    const loader = new Loader({
      apiKey: 'TU_API_KEY_AQUI', // Reemplaza con tu clave API
      version: 'weekly',
    });

    loader.load().then(() => {
      const mapElement = document.getElementById('map') as HTMLElement;
      this.map = new google.maps.Map(mapElement, {
        center: { lat: -33.4489, lng: -70.6693 }, // Coordenadas de ejemplo (Santiago, Chile)
        zoom: 12,
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
    });
  }

  // Método para trazar la ruta
  async trazarRuta(direccionActual: string, direccionDestino: string) {
    const request: google.maps.DirectionsRequest = {
      origin: direccionActual,
      destination: direccionDestino,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        this.alertController.create({
          header: 'Error',
          message: 'No se pudo encontrar la ruta: ' + status,
          buttons: ['OK'],
        }).then(alert => alert.present());
      }
    });
  }
}
