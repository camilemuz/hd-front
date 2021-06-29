import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { Departamento } from 'src/app/models/departamento.model';
import { DivisionModel } from 'src/app/models/division.model';
import { TipoRequerimiento } from 'src/app/models/tipoRequerimiento.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiporequerimiento',
  templateUrl: './tiporequerimiento.component.html',
  styleUrls: ['./tiporequerimiento.component.css']
})
export class TiporequerimientoComponent implements OnInit {

  public tiporeqs: TipoRequerimiento[] = [];
  public tiporeq: TipoRequerimiento;
  public categorias: CategoriaModel []=[];
  public divisiones: DivisionModel[] = [];
  public submitted=false;
  public form:FormGroup;
  
  constructor(
    private parametroService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.index();
    this.cargaParametros();
    this.form = this.formBuilder.group({
      cod: [null, Validators.required],
      sub_cat: [null, Validators.required],
      categoria: [null, Validators.required],
      division: [null, Validators.required],
    
    });

  }
 
  get f(){
    return this.form.controls;
  }

  private index(){
    
     this.parametroService.indextiporeq().subscribe((resp: any) => {
      console.log(resp);
      if (resp.respuesta){
        this.tiporeqs = resp.req;
        
        
      }
    });
  }

  private accionEditar(content: any,tiporeq:TipoRequerimiento){

    this.tiporeq=new TipoRequerimiento();
    this.tiporeq=tiporeq;
    this.modalService.open(content,{size:'lg'});

  }

  public registrar(){
    this.submitted=true;
    if(this.form.invalid){
      Swal.fire(
        'Falta',
        'Tiene marcados los campos que faltan',
        'warning'
      );
      return;
    }
    
    this.parametroService.editartiporeq(this.tiporeq.id_tipo_req,this.tiporeq).subscribe((resp:any)=>{
      if(resp.respuesta){
        this.modalService.dismissAll();
        this.index();
        
        
      }
    })
    
  }


  public eliminar(tiporeq: TipoRequerimiento){
    console.log(tiporeq);
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.parametroService.eliminartiporeq(tiporeq).subscribe((resp: any) => {
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
   
    this.parametroService.categorias().subscribe((res: any) => {
      if (res.respuesta) {
        this.categorias = res.cat;
        console.log('cat-->',res);
        
        
        
      }
    });
    this.parametroService.divisiones().subscribe((res: any) => {
      if (res.respuesta) {
        this.divisiones = res.div;
        console.log('div-->',res);
        
        
      }
    });
  }
}

  
