import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ComuRestService } from 'src/app/services/comu-rest.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  private url='http://localhost/help-front/public/api'
  
  public usuarios: UsuarioModel[] = [];
  public usuario: UsuarioModel;
  userList;


  constructor(
    private userRest:UserRestService,
    private comunRest: ComuRestService,
    private router:Router,
    private auth:AuthService){
    comunRest.get('/parametros/usuarios').subscribe((data)=>{
      console.log(data);
      this.userList=data.data;
    });
  
 
}
  ngOnInit(): void {
    this.listado();
  }
  private listado(){
    this.userRest.getUsers().subscribe((resp: any) => {
      if (resp.respuesta){
        this.usuarios = resp.usuarios;
      }
    });
  }

  // deleteUser(id:number){
  //   if(confirm("¿Desea eliminar usuario?")){
  //     console.log(id);
      
  //     // this.userRest.deleteUser(id).subscribe(
  //     //   (response)=> console.log(response),
  //     //   (error)=>console.log(error)
  //     // );
    
  //   }
  // }
  editUser(row:any,id: number) {
    console.log('sss',row);
    

    // this.router.navigate(['/editar-usuario',id]);
this.auth.editarUsuario(row,id).subscribe(show=>
  {
    console.log(show);
    
  })
  }


}
