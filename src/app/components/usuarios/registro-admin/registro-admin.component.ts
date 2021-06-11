import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CargoModel } from 'src/app/models/cargo.model';
import { DivisionModel } from 'src/app/models/division.model';
import { RolModel } from 'src/app/models/rol.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  public cargos: CargoModel[] = [];
  public form: FormGroup;
  public usuario: UsuarioModel;
  public submitted = false;
  public divisiones: DivisionModel[] = [];
  public roles: RolModel[] = [];

  constructor(
    private authService: AuthService,
    private solicitudService: SolicitudService,
    private formBuilder: FormBuilder
  ) {
    this.cargaParametros();
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      ap_paterno: [null, Validators.required],
      ap_materno: [],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password2: [null, Validators.required],
      rol: [null, Validators.required],
      cargo: [null, Validators.required],
      division: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  get f() {
    return this.form.controls;
  }

  private cargaParametros() {
    this.solicitudService.cargos().subscribe((res: any) => {
      if (res.respuesta) {
        this.cargos = res.cargos;
      }
    });
    this.solicitudService.divisiones().subscribe((res: any) => {
      if (res.respuesta) {
        this.divisiones = res.divisiones;
      }
    });
    this.solicitudService.roles().subscribe((res: any) => {
      if (res.respuesta) {
        this.roles = res.roles;
      }
    });
  }

  public registrar() {
    this.submitted = true;
    if (this.form.invalid) {
      Swal.fire(
        'Falta',
        'Tiene marcados los campos que faltan',
        'warning'
      );
      return;
    }
    if (this.validarContraseñas()) {
      Swal.fire(
        'Advertencia',
        'Las contraseñas no se igualan',
        'warning'
      );
      return;
    }
    this.convertirMayuscula();
    Swal.fire({
      title: 'Pregunta',
      text: '¿Está seguro de guardar al usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando usuario...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.usuario.token = localStorage.getItem('token');
        this.authService.crearUsuarioAdmin(this.usuario).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.usuario = new UsuarioModel();
            this.submitted = false;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
            Toast.fire({
              icon: 'success',
              title: 'Usuario creado con exito'
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: resp.mensaje,
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Se ha cancelado la accion de enviar la solicitud',
          'warning'
        );
      }
    });
  }

  public limpiar() {
    this.usuario = new UsuarioModel();
    this.submitted = false;
  }

  private validarContraseñas() {
    if (this.usuario.password == this.usuario.password2) {
      return false;
    }
    return true;
  }

  private convertirMayuscula() {
    this.usuario.nombre = this.usuario.nombre.toUpperCase();
    this.usuario.ap_paterno = this.usuario.ap_paterno.toUpperCase();
    console.log(this.usuario.ap_materno !== undefined, this.usuario.ap_materno !== '');
    if (this.usuario.ap_materno !== undefined && this.usuario.ap_materno !== '') {
      this.usuario.ap_materno = this.usuario.ap_materno.toUpperCase();
    }
  }
}
