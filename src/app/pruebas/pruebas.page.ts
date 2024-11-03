import { Component, NgZone, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
declare var google: any;


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
  
})
export class PruebasPage implements OnInit {
  map: any;
  directionsService: any;
  directionsDisplay: any;
  
  origin: any = null;
  destination: any = null;
  
  originPlaces: any[] = [];
  destinationPlaces: any[] = [];
  private _originPlaces = new BehaviorSubject<any[]>([]);
  private _destinationPlaces = new BehaviorSubject<any[]>([]);
  currentLocation: { lat: number, lng: number } | null = null; // Para almacenar la ubicación actual


  
  constructor(private zone: NgZone,) {
    this._originPlaces.subscribe(places => {
      this.originPlaces = places;
    });

    this._destinationPlaces.subscribe(places => {
      this.destinationPlaces = places;
    });
  }

  ngOnInit() {
    this.getCurrentLocation();
    this.initMap();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log("Ubicación actual:", this.currentLocation);
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    } else {
      console.error("La geolocalización no es soportada por este navegador.");
    }
  }
  
  initMap() {
    const mapEle: HTMLElement = document.getElementById('map')!;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.map = new google.maps.Map(mapEle, {
      center: this.currentLocation || { lat: -33.610606, lng: -70.585359 },
      zoom: 12,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    this.directionsDisplay.setMap(this.map);
  }

  async onOriginSearchChange(event: any) {
    const searchValue = event.detail?.value;
    if (searchValue && searchValue.length > 0) {
      await this.getPlaces(searchValue, this._originPlaces);
    }
  }

  async onDestinationSearchChange(event: any) {
    const searchValue = event.detail?.value;
    if (searchValue && searchValue.length > 0) {
      await this.getPlaces(searchValue, this._destinationPlaces);
    }
  }

  async getPlaces(query: string, placesSubject: BehaviorSubject<any[]>) {
    try {
      const service = new google.maps.places.AutocompleteService();
      
      service.getPlacePredictions(
        { 
          input: query,
          componentRestrictions: { country: 'CL' } // Restringe búsquedas a Chile
        },
        (predictions: any, status: any) => {
          this.zone.run(async () => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              const autoCompleteItems = [];
              
              for (const prediction of predictions) {
                const latLng = await this.geoCode(prediction.description);
                const place = {
                  title: prediction.structured_formatting.main_text,
                  address: prediction.description,
                  lat: latLng.lat,
                  lng: latLng.lng,
                };
                autoCompleteItems.push(place);
              }
              
              placesSubject.next(autoCompleteItems);
            } else {
              placesSubject.next([]);
            }
          });
        }
      );
    } catch (e) {
      console.error('Error al obtener lugares:', e);
      placesSubject.next([]);
    }
  }

  selectOrigin(place: any) {
    this.origin = place;
    this.originPlaces = [];
    if (this.origin && this.destination) {
      this.calculateRoute();
    }
  }

  selectDestination(place: any) {
    this.destination = place;
    this.destinationPlaces = [];
    if (this.origin && this.destination) {
      this.calculateRoute();
    }
  }

  calculateRoute() {
    if (!this.origin || !this.destination) return;

    const request = {
      origin: { lat: this.origin.lat, lng: this.origin.lng },
      destination: { lat: this.destination.lat, lng: this.destination.lng },
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (response: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        console.log('Ruta calculada exitosamente');
      } else {
        console.error('Error al calcular la ruta:', status);
      }
    });
  }

  geoCode(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === 'OK' && results && results[0]) {
          const latlng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          resolve(latlng);
        } else {
          reject('No se pudo geocodificar la dirección');
        }
      });
    });
  }

}