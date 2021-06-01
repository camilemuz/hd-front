import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/departamento.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  public departamentos: Departamento[] = [];
  
  constructor(
    private parametroService:SolicitudService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.parametroService.departamentos().subscribe((resp: any) => {
      if (resp.respuesta){
        this.departamentos = resp.departamentos;
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
