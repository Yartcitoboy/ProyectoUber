import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.page.html',
  styleUrls: ['./detalle-admin.page.scss'],
})
export class DetalleAdminPage implements OnInit {

  userEmail?: string | null;
  usuario?: Usuario;
  userTipo?: string | null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit() {
    this.userEmail = this.activatedRouter.snapshot.paramMap.get('email');
    if(this.userEmail) {
      this.usuario = this.usuarioService.getUsuarioByEmail(this.userEmail);
      if(this.usuario) {
        this.userTipo = this.usuario.tipo;
      }
    }
  }

  

}
