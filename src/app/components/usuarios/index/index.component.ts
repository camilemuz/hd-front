import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UsuarioModel} from '../../../models/usuario.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from "sweetalert2";
import {SolicitudService} from '../../../services/solicitud.service';
import {CargoModel} from '../../../models/cargo.model';
import {RolModel} from '../../../models/rol.model';
import {DivisionModel} from '../../../models/division.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  public usuarios: UsuarioModel[] = [];
  public usuario: UsuarioModel;
  public submitted = false;
  public form: FormGroup;
  public cargos: CargoModel[] = [];
  public roles: RolModel[] = [];
  public divisiones: DivisionModel[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private solicitudService: SolicitudService,
  ) { }

  ngOnInit(): void {
    this.index();
    this.cargaParametros();
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      ap_paterno: [null, Validators.required],
      ap_materno: [],
      ci: [],
      email: [null, [Validators.required, Validators.email]],
      rol: [null, Validators.required],
      division: [null, Validators.required],
      cargo: [null, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();

  }

  private index():void{
    let cust = {
      email: localStorage.getItem('usuario'),
      token: localStorage.getItem('token')
    }
    this.authService.index(cust).subscribe((resp: any) => {
      // console.log(resp);
      
        this.usuarios = resp.users
      
      this.dtTrigger.next();
    });
  }

  public accionEditar(content: any, usuario: UsuarioModel){
    this.usuario = new UsuarioModel();
    this.usuario = usuario;
    this.modalService.open(content,{ size: 'lg' });
  }

  public registrar(){
    this.submitted = true;
    if (this.form.invalid) {
      Swal.fire(
        'Falta',
        'Tiene marcados los campos que faltan',
        'warning'
      );
      return;
    }
    this.usuario.usuario = localStorage.getItem('usuario');
    this.usuario.token = localStorage.getItem('token');
    this.authService.store(this.usuario.id_usuario, this.usuario).subscribe((resp: any) => {
      if (resp.respuesta){
        this.modalService.dismissAll();
        this.index();
      }
    })
  }

  public eliminar(usuario: UsuarioModel){
    console.log(usuario);
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        usuario.usuario = localStorage.getItem('usuario');
        usuario.token = localStorage.getItem('token');
        this.authService.eliminar(usuario).subscribe((resp: any) => {
          if (resp.respuesta){
            Swal.fire(resp.mensaje, '', 'success');
            this.index();
          }else{
            Swal.fire('Cancelado', '', 'info')
          }
        })
      }
    })
  }

  private cargaParametros() {
    this.solicitudService.cargos().subscribe((res: any) => {
      if (res.respuesta) {
        this.cargos = res.cargos;
      }
    });
    this.solicitudService.roles().subscribe((res: any) => {
      if (res.respuesta) {
        this.roles = res.roles;
      }
    });
    this.solicitudService.divisiones().subscribe((res: any) => {
      if (res.respuesta) {
        this.divisiones = res.divisiones;
      }
    });
  }
}
