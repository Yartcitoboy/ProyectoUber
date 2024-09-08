import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,
              private menuController: MenuController
  ) { }

  ngOnInit() {
    this.menuController.enable(false);
  }

  async loguear(){
    this.router.navigate(['loguear']);
  }
  async registro(){
    this.router.navigate(['registro'])
  }

}
