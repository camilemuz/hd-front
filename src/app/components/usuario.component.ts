import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import Swal from "sweetalert2";
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public menu: any[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let cust = {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('usuario')
    }
    this.authService.recursoUsuario(cust).subscribe((resp: any) => {
      if (resp.respuesta){
        switch (resp.id_rol) {
          case 1:
            this.menu = this.authService.menuFuncionario;
            break;
          case 2:
            this.menu = this.authService.menuAgente;
            break;
          case 3:
            this.menu = this.authService.menuAdmin;
            break;
        }
      }
      else{
        Swal.fire({
          title: 'Sesion Expirada',
          text: "¿Desea volver al Login para acceder a la aplicación?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, ir a Login',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/login');
          }
        })
      }
    });
  }
  


}
