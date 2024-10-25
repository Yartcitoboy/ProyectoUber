import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private mensajeSubject = new BehaviorSubject<string | null>(null);
  mensaje$ = this.mensajeSubject.asObservable();

  mostrarMensaje(mensaje: string, tipo: 'error' | 'success' | 'info' = 'info') {
    Swal.fire({
      icon: tipo,
      title: mensaje,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }
}