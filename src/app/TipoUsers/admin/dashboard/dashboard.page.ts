import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private menuController: MenuController,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.config();
  }

  config(){
    this.usuarios = this.usuarioService.getUsuario();
  }

}
