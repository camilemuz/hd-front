import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public categorias: CategoriaModel[] = [];
  public categoria: CategoriaModel;
  public submitted = false;
  public form: FormGroup;
  
  constructor(
    private parametroService:SolicitudService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.index();
    this.form = this.formBuilder.group({
      categoria: [null, Validators.required],
      cod: [null, Validators.required],
    
    });
    this.categoria=new CategoriaModel();
  }


  get f(){
    return this.form.controls;
  }

  private index(){
    let cust = {
      email: localStorage.getItem('usuario'),
      token: localStorage.getItem('token')
    }
     this.parametroService.indexcat(cust).subscribe((resp: any) => {
      if (resp.respuesta){
        this.categorias = resp.categorias;
      }
    });
  }

 
  private accionEditar(content: any,categoria:CategoriaModel){

    this.categoria=new CategoriaModel();
    this.categoria=categoria;
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
    
    this.parametroService.editarcategoria(this.categoria.id_categoria,this.categoria).subscribe((resp:any)=>{
      if(resp.respuesta){
        this.modalService.dismissAll();
        this.index();
        
        
      }
    })
    
  }


  public eliminar(categoria: CategoriaModel){
    console.log(categoria);
    Swal.fire({
      title: '¿Está seguro de eliminar el registro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.parametroService.eliminarcategoria(categoria).subscribe((resp: any) => {
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


  
  // private cargaParametros() {
  //   this.parametroService.categorias().subscribe((res: any) => {
  //     if (res.respuesta) {
  //       this.categorias = res.categorias;
        
        
  //     }
  //   });
   
  


  }




  
