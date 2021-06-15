import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  public categorias: CategoriaModel[] = [];
  public categoria: CategoriaModel;
  public submitted = false;
  public form: FormGroup;
  
  constructor(
    private parametroService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      categoria: [null, Validators.required],
      cod: [null, Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.categoria = new CategoriaModel();
  }

  get f() {
    return this.form.controls;
  }

  private cargaParametros() {
    this.parametroService.categorias().subscribe((res: any) => {
      if (res.respuesta) {
        this.categorias = res.categorias;
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
      text: '¿Está seguro de guardar la categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando categoría...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.router.navigate(['categoria']);
        this.parametroService.guardarcat(this.categoria).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.categoria = new CategoriaModel();
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
              title: 'Categoría creada con exito'
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
    this.categoria = new CategoriaModel();
    this.submitted = false;
  }

 

  private convertirMayuscula() {
    this.categoria.categoria = this.categoria.categoria.toUpperCase();
    this.categoria.cod = this.categoria.cod.toUpperCase();
    console.log(this.categoria.categoria !== undefined, this.categoria.cod !== '');
   
  }
}
