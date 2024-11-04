export interface Viaje{
    id: string;
    direccionActual: string ;
    direccionDestino: string ;
    costo: number ;
    cantidadPasajeros: number;
    horario: string ; 
    pasajerosReservados: string[]; 
    estado: string; 
    conductorId: string;
}