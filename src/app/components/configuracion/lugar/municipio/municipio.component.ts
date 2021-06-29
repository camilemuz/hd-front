import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from 'src/app/models/departamento.model';
import { Municipio } from 'src/app/models/municipio.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {
  public municipios: Municipio[] = [];
  public municipio: Municipio;
  public submitted=false;
  public form: FormGroup;

  constructor(
    private parametroService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.index();
    this.form = this.formBuilder.group({
      lugar: [null, Validators.required],
      cod: [null, Validators.required],
    
    });
  }
 
  get f(){
    return this.form.controls;
  }

  private index(){
     this.parametroService.indexmunicipio().subscribe((resp: any) => {
      if (resp.respuesta){
        this.municipios = resp.municipios;
        
        
      }
    });
  }

  private accionEditar(content: any,municipio:Municipio){

    this.municipio=new Municipio();
    this.municipio=municipio;
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
    
    this.parametroService.editarmunicipio(this.municipio.id_lugar,this.municipio).subscribe((resp:any)=>{
      if(resp.respuesta){
        this.modalService.dismissAll();
        this.index();
        
        
      }
    })
    
  }


  public eliminar(municipio: Municipio){
    console.log(municipio);
    Swal.fire({
      title: '¿Está seguro de eliminar el municipio?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.parametroService.eliminarmunicipio(municipio).subscribe((resp: any) => {
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
  
