import { Component, OnInit } from '@angular/core';
import {SolicitudService} from '../../services/solicitud.service';
import {CategoriaModel} from '../../models/categoria.model';
import {Solicitud} from '../../models/solicitud.model';
import {TipoRequerimiento} from '../../models/tipoRequerimiento.model';
import {Municipio} from '../../models/municipio.model';
import {Sucursal} from '../../models/sucursal.model';
import Swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Departamento} from '../../models/departamento.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  public categorias: CategoriaModel[] = [];
  public solicitud: Solicitud;
  public tipoRequerimientos: TipoRequerimiento[] = [];
  public municipios: Municipio[] = [];
  public sucursales: Sucursal[] = [];
  public departamentos: Departamento[] = [];

  public form: FormGroup;

  constructor(
    private solicitudService: SolicitudService,
    private formBuilder: FormBuilder
  ) {
    this.solicitud = new Solicitud();
    this.solicitud.categoria_id = 0;
    this.solicitud.municipio_id = 0;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      categoria: [null, Validators.required],
      tipo_solicitud: [null, Validators.required],
      descripcion: [null, Validators.required],
      municipio: [null, Validators.required],
      sucursal: [null, Validators.required],
      interno: [null, Validators.required],
      departamento: [null, Validators.required],
    });
    this.solicitudService.categorias().subscribe((res: any) => {
      if (res.respuesta){
        this.categorias = res.categorias;
      }
    });
    this.solicitudService.municipios().subscribe((res: any) => {
      if (res.respuesta){
        this.municipios = res.municipios;
      }
    });
    this.solicitudService.departamentos().subscribe((res: any) => {
      if (res.respuesta){
        this.departamentos = res.departamentos;
      }
    });
  }

  public limpiar(){
    this.solicitud = new Solicitud();
    this.solicitud.categoria_id = 0;
    this.solicitud.municipio_id = 0;
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  public tipoRequerimiento(){
    this.solicitudService.requerimientos(this.solicitud.categoria_id).subscribe((res: any) => {
      if(res.respuesta){
        this.tipoRequerimientos = res.tipoRequerimientos;
      }
    });
  }

  public sucursal(){
    this.solicitudService.sucursales(this.solicitud.municipio_id).subscribe((res: any) => {
      if(res.respuesta){
        this.sucursales = res.sucursales;
      }
    });
  }

  public enviar(){
    if (this.form.invalid){
      Swal.fire(
        'Error',
        'No se ha completado de llenar el formulario',
        'error'
      );
      return;
    }
    Swal.fire({
        title: 'Pregunta',
        text: '¿Está seguro de enviar la Solicitud?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando solicitud...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.solicitud.token = localStorage.getItem('token');
        this.solicitud.email = localStorage.getItem('usuario');
        this.solicitudService.guardarSolicitud(this.solicitud).subscribe((res: any) =>{
          if (res.respuesta){
            this.solicitud = new Solicitud();
            this.solicitud.categoria_id = 0;
            this.solicitud.municipio_id = 0;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
            Toast.fire({
              icon: 'success',
              title: 'Solicitud enviada con éxito'
            });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.mensaje,
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Se ha cancelado la accion de enviar la solicitud',
          'warning'
        )
      }
    });

  }

}
