@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  async reservarViaje(viajeId: string): Promise<boolean> {
    try {
      console.log('Intentando reservar viaje con ID:', viajeId); // Debug log

      const user = await this.auth.currentUser;
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }
      console.log('Usuario autenticado:', user.uid); // Debug log

      const viajeRef = this.firestore.collection('viajes').doc(viajeId);
      const viajeDoc = await viajeRef.get().toPromise();
      
      console.log('Documento obtenido:', viajeDoc?.exists, viajeDoc?.data()); // Debug log

      if (!viajeDoc?.exists) {
        throw new Error('El viaje no existe');
      }

      const viajeData = viajeDoc.data() as Viaje;
      console.log('Datos del viaje:', viajeData); // Debug log

      // Verificar si hay asientos disponibles
      if (viajeData.cantidadPasajeros <= 0) {
        throw new Error('No hay asientos disponibles');
      }

      // Verificar si el usuario ya reservó
      if (viajeData.pasajerosReservados?.includes(user.uid)) {
        throw new Error('Ya has reservado este viaje');
      }

      // Actualizar el viaje
      const actualizacion = {
        cantidadPasajeros: viajeData.cantidadPasajeros - 1,
        pasajerosReservados: [...(viajeData.pasajerosReservados || []), user.uid],
        estado: viajeData.cantidadPasajeros - 1 === 0 ? 'no disponible' : 'disponible'
      };

      console.log('Actualizando con:', actualizacion); // Debug log

      await viajeRef.update(actualizacion);
      return true;
    } catch (error) {
      console.error('Error al reservar viaje:', error);
      throw error;
    }
  }
} 