import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from 'src/app/models/departamento.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  public departamentos: Departamento[] = [];
  public departamento: Departamento;
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
      departamento: [null, Validators.required],
      cod: [null, Validators.required],
    
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
     this.parametroService.indexDpto(cust).subscribe((resp: any) => {
      if (resp.respuesta){
        this.departamentos = resp.departamentos;
      }
    });
  }

  private accionEditar(content: any,departamento:Departamento){

    this.departamento=new Departamento();
    this.departamento=departamento;
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
    
    this.parametroService.editarDpto(this.departamento.id_departamento,this.departamento).subscribe((resp:any)=>{
      if(resp.respuesta){
        this.modalService.dismissAll();
        this.index();
        
        
      }
    })
    
  }


  public eliminar(departamento: Departamento){
    console.log(departamento);
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.parametroService.eliminarDpto(departamento).subscribe((resp: any) => {
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
  
