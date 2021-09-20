import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { DivisionModel } from 'src/app/models/division.model';
import { TipoRequerimiento } from 'src/app/models/tipoRequerimiento.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tiporeq',
  templateUrl: './crear-tiporeq.component.html',
  styleUrls: ['./crear-tiporeq.component.css']
})
export class CrearTiporeqComponent implements OnInit {

  public tiporeqs: TipoRequerimiento[] = [];
  public tiporeq: TipoRequerimiento;
  public categorias: CategoriaModel[]=[];
  public divisiones: DivisionModel[] = [];
  public submitted = false;
  public form: FormGroup;
  public cat:CategoriaModel[]=[];
  
  constructor(
    private solicitudService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.cargaParametros();
    this.form = this.formBuilder.group({
      sub_cat: [null, Validators.required],
      cod: [null, Validators.required],
      categoria: [null, Validators.required],
      division: [null, Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.tiporeq = new TipoRequerimiento();
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
    this.solicitudService.divisiones().subscribe((res: any) => {
      if (res.respuesta) {
        this.divisiones = res.divisiones;
        
      }
    });
    this.solicitudService.categorias().subscribe((res: any) => {
      if (res.respuesta) {
        this.categorias = res.categorias;
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
      text: '¿Está seguro de guardar el requerimiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Guardando requerimiento...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.router.navigate(['tiporequerimiento']);
        this.solicitudService.guardartiporeq(this.tiporeq).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.tiporeq = new TipoRequerimiento();
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
    this.tiporeq = new TipoRequerimiento();
    this.submitted = false;
  }

 

  private convertirMayuscula() {
    this.tiporeq.sub_cat = this.tiporeq.sub_cat.toUpperCase();
    this.tiporeq.cod = this.tiporeq.cod.toUpperCase();
    console.log(this.tiporeq.sub_cat !== undefined, this.tiporeq.cod !== '');
   
  }
}
