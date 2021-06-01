import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {
  public municipios: Municipio[] = [];
  constructor(
    private parametroService:SolicitudService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.parametroService.municipios().subscribe((resp: any) => {
      if (resp.respuesta){
        this.municipios = resp.municipios;
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


