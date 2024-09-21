import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { chevronForward, listCircle } from 'ionicons/icons';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor() {
    addIcons({ chevronForward, listCircle });
   }

  ngOnInit() {
  }

}
