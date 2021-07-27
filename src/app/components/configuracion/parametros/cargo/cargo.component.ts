import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargoModel } from 'src/app/models/cargo.model';
import { PrioridadModel } from 'src/app/models/prioridad.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  public cargos: CargoModel[] = [];
  public cargo: CargoModel;
  public prioridades:PrioridadModel[] = [];
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
      cargo: [null, Validators.required],
      prioridad: [null, Validators.required],
    
    });

  }

  get f(){
    return this.form.controls;
  }

  private index(){
    
     this.parametroService.cargos().subscribe((resp: any) => {
            if (resp.respuesta){
        this.cargos = resp.cargos;
        console.log('ssss',resp);
        

        
      }
    });
  }

  private accionEditar(content: any,cargo:CargoModel){

    this.cargo=new CargoModel();
    this.cargo=cargo;
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
    
    this.parametroService.updatecargo(this.cargo.id_cargo,this.cargo).subscribe((resp:any)=>{
      if(resp.respuesta){
        this.modalService.dismissAll();
        this.index();
        
        
      }
    })
    
  }


  public eliminar(cargo: CargoModel){
    console.log(cargo);
    Swal.fire({
      title: '¿Está seguro de eliminar el cargo?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.parametroService.eliminarcargo(cargo).subscribe((resp: any) => {
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
   
    this.parametroService.prioridad().subscribe((res: any) => {
      if (res.respuesta) {
        this.prioridades = res.prioridades;
        console.log('prio',res);
        
        
        
        
        
      }
    });
  }
}