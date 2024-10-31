export interface Viaje{
    id?: string;
    direccionActual: string ;
    direccionDestino: string ;
    costo: number ;
    cantidadPasajeros: number;
    horario: string ; 
    pasajerosReservados: any[]; // IDs de pasajeros que han reservado
    estado: string; // Estado del viaje
    conductorId: string;
}