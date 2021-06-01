import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public categorias: Categoria[] = [];

  constructor(
    private parametroService:SolicitudService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.parametroService.categorias().subscribe((resp: any) => {
      if (resp.respuesta){
        this.categorias = resp.categorias;
      }
    });
  }
  editUser(row:any,id: number) {
    // console.log('sss',row);
    

     this.router.navigate(['/editar-usuario',id]);
// this.auth.editarUsuario(row,id).subscribe(show=>
//   {
//     console.log(show);
    
//   })
  }

  }
