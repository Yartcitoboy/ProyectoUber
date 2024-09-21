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
    { id: 1, message: 'Notificación 1', date: '2024-09-01' },
    { id: 2, message: 'Notificación 2', date: '2024-09-15' },
    { id: 3, message: 'Notificación 3', date: '2024-09-20' },
    // Agrega más notificaciones según sea necesario
  ];

  filteredNotifications = [...this.notifications];

  filterDate?: string;
  selectedNotification: any;

  filterNotifications() {
    if (this.filterDate) {
      this.filteredNotifications = this.notifications.filter(notification =>
        notification.date === this.filterDate
        
      );
    } else {
      this.filteredNotifications = [...this.notifications];
      
    }
  }

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

  


