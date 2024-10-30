import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-prueba-qr',
  templateUrl: './prueba-qr.page.html',
  styleUrls: ['./prueba-qr.page.scss'],
})
export class PruebaQRPage implements OnInit {

  uid: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(aux => {
      this.uid = aux['uid'];
    });
  }

}
