import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { Departamento } from 'src/app/models/departamento.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.css']
})
export class CrearDepartamentoComponent implements OnInit {

  public departamentos: Departamento[] = [];
  public departamento: Departamento;
  public submitted = false;
  public form: FormGroup;
  
  constructor(
    private parametroService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      departamento: [null, Validators.required],
      cod: [null, Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.departamento = new Departamento();
  }

  get f() {
    return this.form.controls;
  }

  private cargaParametros() {
    this.parametroService.departamentos().subscribe((res: any) => {
      if (res.respuesta) {
        this.departamentos = res.departamentos;
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
      text: '¿Está seguro de guardar el Departamento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando departamento...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.router.navigate(['departamento']);
        this.parametroService.guardardpto(this.departamento).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.departamento = new Departamento();
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
              title: 'Departamento creada con exito'
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
    this.departamento = new Departamento();
    this.submitted = false;
  }

 

  private convertirMayuscula() {
    this.departamento.departamento = this.departamento.departamento.toUpperCase();
    this.departamento.cod = this.departamento.cod.toUpperCase();
    console.log(this.departamento.departamento !== undefined, this.departamento.cod !== '');
   
  }
}
