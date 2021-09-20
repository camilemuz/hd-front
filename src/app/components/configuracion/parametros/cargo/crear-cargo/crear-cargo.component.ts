import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargoModel } from 'src/app/models/cargo.model';
import { PrioridadModel } from 'src/app/models/prioridad.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cargo',
  templateUrl: './crear-cargo.component.html',
  styleUrls: ['./crear-cargo.component.css']
})
export class CrearCargoComponent implements OnInit {

  public cargos: CargoModel[]=[];
  public cargo:CargoModel;
  public prioridades:PrioridadModel[]=[];
  public submitted=false;
  public form:FormGroup;

  constructor(
    private solicitudService:SolicitudService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.cargaParametros();
    this.form = this.formBuilder.group({
      cargo: [null, Validators.required],
      cod: [null, Validators.required],
      prioridad: [null, Validators.required],
     
    });
  }

  ngOnInit(): void {
    this.cargo = new CargoModel();
  }

  get f() {
    return this.form.controls;
  }

  private cargaParametros() {

    this.solicitudService.prioridad().subscribe((res: any) => {
      if (res.respuesta) {
        this.prioridades = res.prioridades;
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
      text: '¿Está seguro de guardar el Cargo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando Cargo...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.router.navigate(['cargo']);
        this.solicitudService.storecargo(this.cargo).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.cargo = new CargoModel();
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
              title: 'Cargo creado con exito'
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
    this.cargo = new CargoModel();
    this.submitted = false;
  }

 

  private convertirMayuscula() {
    this.cargo.cargo = this.cargo.cargo.toUpperCase();
    this.cargo.cod = this.cargo.cod.toUpperCase();
    console.log(this.cargo.cargo !== undefined, this.cargo.cod !== '');
   
  }
}


