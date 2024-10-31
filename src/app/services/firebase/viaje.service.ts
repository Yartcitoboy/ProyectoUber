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
<<<<<<< HEAD
      .where('estado', '==', 'disponible')
      .limit(1))
      .snapshotChanges()
      .pipe(
        map(actions => {
          if (actions.length > 0) {
            const data = actions[0].payload.doc.data() as Viaje;
            const id = actions[0].payload.doc.id;
            return { ...data, id };
          }
          return null;
        })
=======
      .orderBy('fecha', 'desc') // Ordena por fecha para obtener el más reciente
      .limit(1))
      .valueChanges().pipe(
        map(viajes => (viajes.length > 0 ? viajes[0] : null))
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
      );
  }
  
  actualizarCapacidadPasajeros(viajeId: string, nuevosPasajeros: number): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update({ cantidadPasajeros: nuevosPasajeros });
  }
  
  obtenerViajePorId(id: string): Observable<Viaje | undefined> {
<<<<<<< HEAD
    console.log('Obteniendo viaje con ID:', id);
    return this.firestore.doc<Viaje>(`viajes/${id}`).snapshotChanges().pipe(
      map(doc => {
        if (doc.payload.exists) {
          const data = doc.payload.data() as Viaje;
          const id = doc.payload.id;
          console.log('Datos del viaje obtenidos:', { ...data, id });
          return { ...data, id };
        } else {
          console.log('No se encontró el viaje');
          return undefined;
        }
      }),
      catchError(error => {
        console.error('Error al obtener el viaje:', error);
=======
    console.log('Servicio: Intentando obtener viaje con ID:', id);
    return this.firestore.doc<Viaje>(`viajes/${id}`).valueChanges().pipe(
      tap(viaje => console.log('Servicio: Viaje obtenido:', viaje)),
      catchError(error => {
        console.error('Servicio: Error al obtener el viaje:', error);
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
        return of(undefined);
      })
    );
  }

  obtenerTodosLosViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes').valueChanges();
  }
  
<<<<<<< HEAD
  async cancelarViaje(id: string) {
    try {
      await this.firestore.collection('viajes').doc(id).delete();
      console.log('Viaje eliminado correctamente');
      return true;
    } catch (error) {
      console.error('Error al eliminar el viaje:', error);
      throw error;
    }
=======
  cancelarViaje(id: string): Observable<void> {
    return from(this.firestore.collection('viajes').doc(id).update({ estado: 'cancelado' })).pipe(
      catchError((error: any) => throwError(() => error))
    );
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
  }
  
  // Método para confirmar el viaje (actualizar estado)
  confirmarViaje(id: string): Promise<void> {
    return this.firestore.collection('viajes').doc(id).update({ estado: 'activo' });
  }
<<<<<<< HEAD

  eliminarViaje(viajeId: string): Promise<void> {
  return this.firestore.collection('viajes').doc(viajeId).delete();
}

  
=======
>>>>>>> a449e4e8a02de6f63a61efe092c7d8a13c86c7ce
}
