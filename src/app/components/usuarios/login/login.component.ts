import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioModel} from '../../../models/usuario.model';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public form: FormGroup;
  public usuario: UsuarioModel;
  public btnEntrar: boolean = false;
  public Toast = Swal.mixin({
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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: [],
    });
    this.usuario = new  UsuarioModel();
    localStorage.clear();
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      Swal.fire(
        'Falta',
        'Tiene marcados los campos que faltan',
        'warning'
      );
      return;
    }
    Swal.fire({
      icon: 'info',
      title: 'Buscando...',
      text: 'Espere un momento por favor!',
    });
    Swal.showLoading();
    this.authService.entrarUsuario(this.usuario).subscribe((resp: any) => {
      if (resp.respuesta){
        this.btnEntrar = true;
        this.Toast.fire({
          icon: 'success',
          title: resp.mensaje
        });
        localStorage.setItem('usuario', this.usuario.email);
        localStorage.setItem('token', resp.token);
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 3000);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resp.mensaje
        })
      }
    });
  }
}
