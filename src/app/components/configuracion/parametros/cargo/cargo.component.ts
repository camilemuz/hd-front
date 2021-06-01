import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargoModel } from 'src/app/models/cargo.model';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  public cargos: CargoModel[] = [];

  constructor(
    private parametroService:SolicitudService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.parametroService.cargos().subscribe((resp: any) => {
      if (resp.respuesta){
        this.cargos = resp.cargos;
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
