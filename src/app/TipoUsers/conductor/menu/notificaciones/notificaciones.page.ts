import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage {

  @ViewChild(IonModal) modal?: IonModal;
  notifications = [
    {
      sender: 'Juan Carlos',
      message: 'Viaje',
      note: 'Juan carlos se unio a tu viaje',
      time: '06:11',
    },
    {
      sender: 'Ionitron',
      message: 'I have become sentient',
      note: 'That is all.',
      time: '03:44',
    },
    {
      sender: 'Steam',
      message: 'Game Store Sale',
      note: 'That game you added to your wish list 2 years ago is now on sale!',
      time: 'Yesterday',
    },
    {
      sender: 'Ionic',
      message: 'Announcing Ionic 7.0',
      note: 'This version is one more than Ionic 6!',
      time: 'Yesterday',
    },
  ];

  selectedNotification: any = null;

  

  openModal(notification: any) {
    this.selectedNotification = notification;
    this.modal?.present();
  }

  // Cerrar modal
  closeModal() {
    this.modal?.dismiss();
  };

  constructor() { 

  };
}

  


