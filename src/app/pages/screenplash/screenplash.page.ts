import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screenplash',
  templateUrl: './screenplash.page.html',
  styleUrls: ['./screenplash.page.scss'],
})
export class ScreenplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  }

}
