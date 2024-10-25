import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private mensajeSubject = new Subject<string>();
  mensaje$ = this.mensajeSubject.asObservable();

  mostrarMensaje(mensaje: string) {
    this.mensajeSubject.next(mensaje);
  }
}
