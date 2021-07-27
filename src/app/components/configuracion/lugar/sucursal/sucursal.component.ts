import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Municipio } from 'src/app/models/municipio.model';
import { Sucursal } from 'src/app/models/sucursal.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  public sucursales: Sucursal[]=[];
  public sucursal:Sucursal;
  public municipios:Municipio[]=[];
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
      sucursal: [null, Validators.required],
      municipio: [null, Validators.required],
           
    });

  }

  get f(){
    return this.form.controls;
  }

  private index(){
    
     this.parametroService.indexsucursal().subscribe((resp: any) => {
      if (resp.respuesta){
        this.sucursales = resp.sucursales;
      }
    });
  }

  private accionEditar(content: any,sucursal:Sucursal){

    this.sucursal=new Sucursal();
    this.sucursal=sucursal;
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
    
    this.parametroService.editarsucursal(this.sucursal.id_sucursal,this.sucursal).subscribe((resp:any)=>{
      if(resp.respuesta){
        this.modalService.dismissAll();
        this.index();
        
        
      }
    })
    
  }


  public eliminar(sucursal: Sucursal){
    console.log(sucursal);
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.parametroService.eliminarsucursal(sucursal).subscribe((resp: any) => {
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
   
    this.parametroService.municipios().subscribe((res: any) => {
      if (res.respuesta) {
        this.municipios = res.municipios;
       
      }
    });
   
        
  
  }
}
