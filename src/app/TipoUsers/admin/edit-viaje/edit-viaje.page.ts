import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajeService } from 'src/app/services/firebase/viaje.service';

@Component({
  selector: 'app-edit-viaje',
  templateUrl: './edit-viaje.page.html',
  styleUrls: ['./edit-viaje.page.scss'],
})
export class EditViajePage implements OnInit {

  viajeId: string = '';
  editViajeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private activatedRoute: ActivatedRoute, private viajeService: ViajeService) { 
    this.editViajeForm = this.formBuilder.group({
      direccionActual: ['', [Validators.required]],
      direccionDestino: ['', [Validators.required]],
      costo: [0, [Validators.required]],
      cantidadPasajeros: [0, [Validators.required]],
      horario: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.viajeId = this.activatedRoute.snapshot.paramMap.get('viajeId') || '';
    this.loadData();
  }

  loadData() {
    this.viajeService.obtenerViajePorId(this.viajeId).subscribe((viaje: Viaje | undefined) => {
        if (viaje) {
            this.editViajeForm.patchValue({
                direccionActual: viaje.direccionActual,
                direccionDestino: viaje.direccionDestino,
                costo: viaje.costo,
                cantidadPasajeros: viaje.cantidadPasajeros,
                horario: viaje.horario
            });
        } else {
            console.error('El viaje no existe');
        }
    });
}

  async actualizarViaje() {
    if (this.editViajeForm.valid) {
      try {
        const viajeRef = this.firestore.collection('viajes').doc(this.viajeId); 
        await viajeRef.update(this.editViajeForm.value);
        console.log('Viaje actualizado con éxito');
        // TODO: Mostrar mensaje de confirmación al usuario
      } catch (error) {
        console.error('Error al actualizar viaje:', error);
        // TODO: Mostrar mensaje de error al usuario
      }
    } else {
      console.log('Formulario inválido');
      // TODO: Informar al usuario sobre campos inválidos
    }
  }
}
