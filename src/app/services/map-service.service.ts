import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: google.maps.Map;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  constructor() {
    this.initializeMap();
  }

  private async initializeMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyBGtiLWSXcSGoNfIS1x7PwrX4aDD9yT9mo', // Reemplaza con tu clave API
      version: 'weekly',
    });

    await loader.load();
    const mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, {
      center: { lat: -33.4489, lng: -70.6693 },
      zoom: 12,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
  }

  public trazarRuta(direccionActual: string, direccionDestino: string) {
    const request: google.maps.DirectionsRequest = {
      origin: direccionActual,
      destination: direccionDestino,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Error al trazar la ruta:', status);
      }
    });
  }
}
