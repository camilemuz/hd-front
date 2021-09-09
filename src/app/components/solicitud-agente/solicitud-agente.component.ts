import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable, Subscriber } from 'rxjs';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { Departamento } from 'src/app/models/departamento.model';
import { Municipio } from 'src/app/models/municipio.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { Sucursal } from 'src/app/models/sucursal.model';
import { TipoRequerimiento } from 'src/app/models/tipoRequerimiento.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-agente',
  templateUrl: './solicitud-agente.component.html',
  styleUrls: ['./solicitud-agente.component.css']
})
export class SolicitudAgenteComponent implements OnInit {

  public categorias: CategoriaModel[] = [];
  public solicitud: Solicitud;
  public tipoRequerimientos: TipoRequerimiento[] = [];
  public municipios: Municipio[] = [];
  public sucursales: Sucursal[] = [];
  public departamentos: Departamento[] = [];
  public usuarios: UsuarioModel[] = [];
  public seleccionUser:any;

  public form: FormGroup;

  constructor(
    private solicitudService: SolicitudService,
    private authService: AuthService,
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
      media: [null],
      departamento: [null, Validators.required],
      usuario: [null, Validators.required],
     //https://www.npmjs.com/package/@rxweb/reactive-form-validators
      archivo: [null, RxwebValidators.extension({extensions: ['jpg', 'pdf','docx','xlsx']})],
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
    this.authService.usuarios().subscribe((res:any)=>{
      if (res.respuesta){
        this.usuarios = res.usuarios;
        // console.log('user', res);
        
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


  public fileChangeEvent($event: Event){
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertirToBase64(file);
  }

  public convertirToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      this.solicitud.archivo = d;
    });
  }

  public readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror = (error) => {
      subscriber.error(error);
    }
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
        this.solicitud.email = this.seleccionUser.email;
        this.solicitudService.Solicitudagente(this.solicitud).subscribe((res: any) =>{
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

  filtroChangeCat(c){
    // console.log('bbbbb',JSON.stringify(c.target.value));
    this.usuarios.forEach(value =>{
    if(value.id_usuario == c.target.value){
      this.seleccionUser = value;
  
  
    }
    // console.log(this.seleccionUser);
    })
   
       
     }

     
}
