import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  uid: string = '';
  editUserForm?: FormGroup;

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore, private activatedRoute: ActivatedRoute) { 
    this.editUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('uid') || '';
    this.loadData();
  }

  loadData() {
    this.firestore.collection('usuarios').doc(this.uid).get().toPromise()
    .then((user)=>{
      if (user) {
        const userData = user?.data() as Usuario;
        this.editUserForm?.patchValue({
          email : userData.email,
          nombre: userData.nombre,
          tipo: userData.tipo,
          pass: userData.pass
        })
      }
    })
    .catch(error=>{

    });
  }

  async actualizarUser() {
    if (this.editUserForm && this.editUserForm.valid) {
      try {
        const userRef = this.firestore.collection('usuarios').doc(this.uid);
        await userRef.update(this.editUserForm.value);
        console.log('Usuario actualizado con éxito');
        // TODO: Mostrar mensaje de confirmación al usuario
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        // TODO: Mostrar mensaje de error al usuario
      }
    } else {
      console.log('Formulario inválido');
      // TODO: Informar al usuario sobre campos inválidos
    }
  }

}
