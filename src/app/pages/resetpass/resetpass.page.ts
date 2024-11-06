import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage {
  email: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async recoveryEmail() {
    if (!this.email || !this.email.trim()) {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un correo electrónico',
        heightAuto: false
      });
      return;
    }

    this.isLoading = true;

    try {
      await this.authService.recoveryPassword(this.email.trim());
      
      await Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada y spam.',
        confirmButtonText: 'OK',
        heightAuto: false
      });
      
      this.router.navigate(['/loguear']);
      
    } catch (error: any) {
      console.error('Error en recuperación:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Hubo un problema al enviar el correo',
        confirmButtonText: 'OK',
        heightAuto: false
      });
    } finally {
      this.isLoading = true;
    }
  }
}
