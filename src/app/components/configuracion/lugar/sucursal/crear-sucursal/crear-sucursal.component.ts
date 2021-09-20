import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Municipio } from 'src/app/models/municipio.model';
import { Sucursal } from 'src/app/models/sucursal.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear-sucursal.component.html',
  styleUrls: ['./crear-sucursal.component.css']
})
export class CrearSucursalComponent implements OnInit {

  public sucursales: Sucursal[]=[];
  public sucursal:Sucursal;
  public municipios:Municipio[]=[];
  public submitted=false;
  public form:FormGroup;

  constructor(
    private solicitudService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.cargaParametros();
    this.form = this.formBuilder.group({
      sucursal: [null, Validators.required],
      cod: [null, Validators.required],
      municipio: [null, Validators.required],
     
    });
  }

  ngOnInit(): void {
    this.sucursal = new Sucursal();
  }

  get f() {
    return this.form.controls;
  }

  private cargaParametros() {
    // this.parametroService.indextiporeq().subscribe((rest: any) => {
    //   if (rest.respuesta) {
    //     this.tiporeqs = rest.req;
    //   }
    // });
    this.solicitudService.municipios().subscribe((res: any) => {
      if (res.respuesta) {
        this.municipios = res.municipios;
        console.log('ee',res);
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
    
    this.convertirMayuscula();
    Swal.fire({
      title: 'Pregunta',
      text: '¿Está seguro de guardar la Sucursal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando Sucursal...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.router.navigate(['sucursal']);
        this.solicitudService.guardarsucursal(this.sucursal).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.sucursal = new Sucursal();
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
              title: 'Requerimiento creado con exito'
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
    this.sucursal = new Sucursal();
    this.submitted = false;
  }

 

  private convertirMayuscula() {
    this.sucursal.sucursal = this.sucursal.sucursal.toUpperCase();
    this.sucursal.cod = this.sucursal.cod.toUpperCase();
    console.log(this.sucursal.sucursal !== undefined, this.sucursal.cod !== '');
   
  }
}

