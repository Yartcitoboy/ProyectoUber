import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios = [
    {'email': 'admin@admin.cl', 'pass': 'admin123', 'tipo': 'admin'},
    {'email': 'pasa@user.cl', 'pass': 'pasa123', 'tipo': 'pasajero'},
    {'email': 'cond@user.cl', 'pass': 'cond123', 'tipo': 'conductor'},
    {'email': 'invi@invi.cl', 'pass': 'invi123', 'tipo': 'invitado'},
  ]

  constructor() { }

  getUsuario(){
    return this.usuarios;
  }

  getUsuarioByEmail(email: string){
    return this.usuarios.find(aux => aux.email === email);
  }

  addUsuario(usuario: Usuario){
    this.usuarios.push(usuario);
  }

  deleteUsuario(){

  }

  updateUsuario(){
    
  }
}
