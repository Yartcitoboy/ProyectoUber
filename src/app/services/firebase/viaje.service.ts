import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Viaje } from 'src/app/interfaces/viaje';
import { map, catchError, from, throwError, of, tap } from 'rxjs';
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

  async agregarViaje(viaje: Viaje): Promise<any> {
    const conductorId = viaje.conductorId;
    const hasActiveTrip = await this.verificarViajeActivo(conductorId);
    if (hasActiveTrip) {
      throw new Error('Ya tienes un viaje en curso');
    }
    return this.firestore.collection('viajes').add(viaje);
  }

  actualizarViaje(viajeId: string, actualizaciones: Partial<Viaje>): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update(actualizaciones);
  }
  
  obtenerViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes').valueChanges();
  }

  async verificarViajeActivo(conductorId: string) {
    const viajeActivo = await this.firestore.collection<Viaje>('viajes', ref => 
      ref.where('conductorId', '==', conductorId).where('estado', '==', 'disponible')
    ).get().toPromise();

    return viajeActivo && viajeActivo.docs.length > 0;
  }
  
  obtenerViajePorConductor(conductorId: string): Observable<Viaje | null> {
    return this.firestore.collection<Viaje>('viajes', ref => ref
      .where('conductorId', '==', conductorId)
      .orderBy('fecha', 'desc') // Ordena por fecha para obtener el más reciente
      .limit(1))
      .valueChanges().pipe(
        map(viajes => (viajes.length > 0 ? viajes[0] : null))
      );
  }
  
  actualizarCapacidadPasajeros(viajeId: string, nuevosPasajeros: number): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update({ cantidadPasajeros: nuevosPasajeros });
  }
  
  obtenerViajePorId(id: string): Observable<Viaje | undefined> {
    console.log('Servicio: Intentando obtener viaje con ID:', id);
    return this.firestore.doc<Viaje>(`viajes/${id}`).valueChanges().pipe(
      tap(viaje => console.log('Servicio: Viaje obtenido:', viaje)),
      catchError(error => {
        console.error('Servicio: Error al obtener el viaje:', error);
        return of(undefined);
      })
    );
  }

  obtenerTodosLosViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes').valueChanges();
  }
  
  cancelarViaje(id: string): Observable<void> {
    return from(this.firestore.collection('viajes').doc(id).update({ estado: 'cancelado' })).pipe(
      catchError((error: any) => throwError(() => error))
    );
  }
  
  // Método para confirmar el viaje (actualizar estado)
  confirmarViaje(id: string): Promise<void> {
    return this.firestore.collection('viajes').doc(id).update({ estado: 'activo' });
  }
}
