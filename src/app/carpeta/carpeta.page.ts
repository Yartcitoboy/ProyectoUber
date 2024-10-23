import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.page.html',
  styleUrls: ['./carpeta.page.scss'],
})
export class CarpetaPage implements OnInit {
  public carpeta!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() { }

  ngOnInit() {
    this.carpeta = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
