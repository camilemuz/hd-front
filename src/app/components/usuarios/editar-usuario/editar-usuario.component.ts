import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  updateUser: FormGroup | any;
  public usuario: UsuarioModel;
  @Input() data: any;

  constructor(
    private auth:AuthService,
    private route:ActivatedRoute,
    private userRest: UserRestService,
    private router:Router

    ) { }

  ngOnInit(): void {
 let id=  this.route.snapshot.params.id;
 console.log('id',id);
  
 this.userRest.editUser(id).subscribe(
   (response)=>{
     console.log(response);
     
     this.updateUser.patchValue({
      'nombre': response.data.nombre,
      'ap_paterno': response.data.ap_paterno,
      'ap_materno': response.data.ap_materno,
      'rol_id_rol':response.data.id_rol,
      "cargo_id_cargo":response.data.id_cargo,
      'email':response.data.email,
      'division_id_division':response.data.email,
      })
    },
    (error) => console.log(error)
  );
  
  console.log(this.data);


  this.updateUser = new FormGroup({
        'nombre': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'ap_paterno': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'ap_materno': new FormControl(null,[]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'cargo_id_cargo': new FormControl(null, [Validators.required]),
        'rol_id_rol': new FormControl(null, [Validators.required]),
        'division_id_division': new FormControl(null, [Validators.required]),
       
    
  });

   }
   get nombre() { return this.updateUser.get('nombre'); }
   get ap_paterno() { return this.updateUser.get('ap_paterno'); }
   get ap_materno() { return this.updateUser.get('ap_materno'); }
   get email() { return this.updateUser.get('email'); }
   get rol_id_rol() { return this.updateUser.get('id_rol'); }
   get cargo_id_cargo() { return this.updateUser.get('cargo_id_cargo'); }
   get division_id_division() { return this.updateUser.get('division_id_division'); }


   updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateUser(this.updateUser,id).subscribe(
      (response) => {
        console.log(response),
        this.router.navigate(['/listar-usuario'])
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  }

  
   }


