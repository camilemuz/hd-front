import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from 'src/app/models/departamento.model';
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
  public submitted=false;
  public form:FormGroup;
  
  constructor(
    private parametroService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.index();
    this.form = this.formBuilder.group({
      cod: [null, Validators.required],
      sub_cat: [null, Validators.required],
      categoria_id_categoria: [null, Validators.required],
      division_id_division: [null, Validators.required],
    
    });
  }
 
  get f(){
    return this.form.controls;
  }

  private index(){
    let cust = {
      email: localStorage.getItem('usuario'),
      token: localStorage.getItem('token')
    }
     this.parametroService.indextiporeq(cust).subscribe((resp: any) => {
      if (resp.respuesta){
        this.tiporeqs = resp.tiporeqs;
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
}
  
