import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from 'src/app/models/departamento.model';
import { Municipio } from 'src/app/models/municipio.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-municipio',
  templateUrl: './crear-municipio.component.html',
  styleUrls: ['./crear-municipio.component.css']
})
export class CrearMunicipioComponent implements OnInit {
  public municipios: Municipio[] = [];
  public municipio: Municipio;
  public submitted = false;
  public form: FormGroup;
  
  constructor(
    private parametroService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      lugar: [null, Validators.required],
      cod: [null, Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.municipio = new Municipio();
  }

  get f() {
    return this.form.controls;
  }

  // private cargaParametros() {
  //   this.parametroService.municipios().subscribe((res: any) => {
  //     if (res.respuesta) {
  //       this.municipios = res.municipio;
  //     }
  //   });
  // }

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
      text: '¿Está seguro de guardar la Municipio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando municipio...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.router.navigate(['municipio']);
        this.parametroService.guardarmun(this.municipio).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.municipio = new Municipio();
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
              title: 'Municipio creado con exito'
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
    this.municipio = new Municipio();
    this.submitted = false;
  }


 

  private convertirMayuscula() {
    this.municipio.lugar = this.municipio.lugar.toUpperCase();
    this.municipio.cod = this.municipio.cod.toUpperCase();
    console.log(this.municipio.lugar !== undefined, this.municipio.cod !== '');
   
  }
}
