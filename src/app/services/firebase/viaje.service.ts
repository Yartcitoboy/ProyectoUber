import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  async agregarViaje(viaje: Viaje): Promise<any> {
    const conductorId = viaje.conductorId;
    const hasActiveTrip = await this.verificarViajeActivo(conductorId);
    if (hasActiveTrip) {
      throw new Error('Ya tienes un viaje en curso');
    }
    
    // Asegurarnos de que el viaje tenga un array de pasajeros vacío al crearse
    const nuevoViaje = {
      ...viaje,
      pasajerosReservados: [],
      estado: 'disponible'
    };
    
    return this.firestore.collection('viajes').add(nuevoViaje);
  }

  actualizarViaje(viajeId: string, actualizaciones: Partial<Viaje>): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update(actualizaciones);
  }
  
  obtenerViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Viaje;
          const id = a.payload.doc.id;
          console.log('Viaje obtenido:', { ...data, id }); // Debug log
          return { ...data, id };
        }))
      );
  }

  async verificarViajeActivo(conductorId: string) {
    const viajeActivo = await this.firestore.collection<Viaje>('viajes', ref => 
      ref.where('conductorId', '==', conductorId).where('estado', '==', 'disponible')
    ).get().toPromise();

    return viajeActivo && viajeActivo.docs.length > 0;
  }
  
  obtenerConductorPorId(conductorId: string): Observable<any> {
    return this.firestore.collection('conductores').doc(conductorId).snapshotChanges().pipe(
      map(doc => {
        if (doc.payload.exists) {
          const data = doc.payload.data() as any;
          return { id: doc.payload.id, ...data };
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al obtener el conductor:', error);
        return of(null);
      })
    );
  }

  obtenerUsuariosPorIds(ids: string[]): Observable<any[]> {
    return this.firestore.collection('usuarios', ref => ref.where('id', 'in', ids)).valueChanges();
  }
  
  

  obtenerViajesPorPasajero(pasajeroId: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes', ref => 
      ref.where('pasajerosReservados', 'array-contains', pasajeroId)
    ).valueChanges();
  }
  
  actualizarCapacidadPasajeros(viajeId: string, nuevosPasajeros: number): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update({ cantidadPasajeros: nuevosPasajeros });
  }
  
  obtenerViajePorId(id: string): Observable<Viaje | undefined> {
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
        return of(undefined);
      })
    );
  }

  obtenerTodosLosViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes').valueChanges();
  }
  
  async cancelarViaje(id: string) {
    try {
      await this.firestore.collection('viajes').doc(id).delete();
      console.log('Viaje eliminado correctamente');
      return true;
    } catch (error) {
      console.error('Error al eliminar el viaje:', error);
      throw error;
    }
  }
  
  // Método para confirmar el viaje (actualizar estado)
  confirmarViaje(id: string): Promise<void> {
    return this.firestore.collection('viajes').doc(id).update({ estado: 'activo' });
  }

  eliminarViaje(viajeId: string): Promise<void> {
  return this.firestore.collection('viajes').doc(viajeId).delete();
}

async reservarViaje(viajeId: string): Promise<boolean> {
  try {
    const user = await this.auth.currentUser;
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }

    return this.firestore.firestore.runTransaction(async (transaction) => {
      const viajeRef = this.firestore.collection('viajes').doc(viajeId).ref;
      const viajeDoc = await transaction.get(viajeRef);

      if (!viajeDoc.exists) {
        throw new Error('El viaje no existe');
      }

      const viajeData = viajeDoc.data() as Viaje;
      
      // Verificaciones
      if (viajeData.cantidadPasajeros <= 0) {
        throw new Error('No hay asientos disponibles');
      }

      if (viajeData.pasajerosReservados?.includes(user.uid)) {
        throw new Error('Ya has reservado este viaje');
      }

      // Actualizar el documento
      const nuevosReservados = [...(viajeData.pasajerosReservados || []), user.uid];
      const nuevaCantidad = viajeData.cantidadPasajeros - 1;

      transaction.update(viajeRef, {
        cantidadPasajeros: nuevaCantidad,
        pasajerosReservados: nuevosReservados,
        estado: nuevaCantidad === 0 ? 'completo' : 'disponible'
      });

      return true;
    });

  } catch (error) {
    console.error('Error al reservar:', error);
    throw error;
  }
}

// Agregar este método al servicio para debug
async verificarExistenciaViaje(viajeId: string) {
  const doc = await this.firestore.collection('viajes').doc(viajeId).get().toPromise();
  console.log('Verificación de viaje:', {
    id: viajeId,
    existe: doc?.exists,
    data: doc?.data()
  });
}
  
}
