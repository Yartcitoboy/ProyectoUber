import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-viaje',
  templateUrl: './info-viaje.page.html',
  styleUrls: ['./info-viaje.page.scss'],
})
export class InfoViajePage implements OnInit {

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin = { lat: -33.610606, lng: -70.585359 };
  destination = { lat: -33.598308671641426, lng:  -70.57875488593972 };

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map')!;
    const indicatorsEle: HTMLElement = document.getElementById('indicators')!;

    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculaRuta();
    });
  }

  private calculaRuta() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
