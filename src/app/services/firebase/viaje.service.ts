import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  direccion1?: string;
  direccion2?: string;
  horario?: string;
  costo?: number;
  cantidadPasajeros?: number;

  constructor(private firestore: AngularFirestore) { }

  agregarViaje(viaje: ViajeService): Promise<any> {
    return this.firestore.collection('viajes').add(viaje);
  }
}
