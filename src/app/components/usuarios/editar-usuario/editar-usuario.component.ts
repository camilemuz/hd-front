import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoModel } from 'src/app/models/cargo.model';
import { DivisionModel } from 'src/app/models/division.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UserRestService } from 'src/app/services/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  form: FormGroup | any;
  public usuario: UsuarioModel;
  public cargos: CargoModel[] = [];
  public divisiones: DivisionModel[] = [];
  public submitted = false;
  @Input() data: any;
  cargoList;
  rolList;
  private url='http://localhost/mda/help-back/api';

  constructor(
    private auth:AuthService,
    private route:ActivatedRoute,
    private userRest: UserRestService,
    private router:Router,
    private solicitudService:SolicitudService,
    private formBuilder: FormBuilder,
    http:HttpClient

    ) { 
      http.get(this.url+'/parametros/cargo').subscribe((data)=>{
        console.log(data);
        this.cargoList=data;
      });
      http.get(this.url+'/parametros/rol').subscribe((data)=>{
        console.log(data);
        this.rolList=data;
      });
     }
    

  ngOnInit(): void {
 let id=  this.route.snapshot.params.id;
 console.log('id',id);
  
 this.userRest.editUser(id).subscribe(
   (response)=>{
     console.log(response);
     
     this.form.patchValue({
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


  this.form = new FormGroup({
        'nombre': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'ap_paterno': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'ap_materno': new FormControl(null,[]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'cargo_id_cargo': new FormControl(null, [Validators.required]),
        'rol_id_rol': new FormControl(null, [Validators.required]),
        'division_id_division': new FormControl(null, [Validators.required]),
       
    
  });

   }
   private cargaParametros() {
    this.solicitudService.cargos().subscribe((res: any) => {
      if (res.respuesta) {
        this.cargos = res.cargos;
      }
    }    );
    // this.solicitudService.divisiones().subscribe((res: any) => {
    //   if (res.respuesta) {
    //     this.divisiones = res.divisiones;
    //   }
    // }    );
  }

   get nombre() { return this.form.get('nombre'); }
   get ap_paterno() { return this.form.get('ap_paterno'); }
   get ap_materno() { return this.form.get('ap_materno'); }
   get email() { return this.form.get('email'); }
   get rol_id_rol() { return this.form.get('id_rol'); }
   get cargo_id_cargo() { return this.form.get('cargo_id_cargo'); }
   get division_id_division() { return this.form.get('division_id_division'); }


   updateUserDetails(){
    let id = this.route.snapshot.params.id;
    this.userRest.updateUser(this.form,id).subscribe(
      (response) => {
        console.log(response),
        this.router.navigate(['/listar-usuario'])
      },
      (error) => console.log(error),
      () => console.log('completed')
    );
  }
  get f() {
    return this.form.controls;
  }
  // 
  
  
  public limpiar() {
    this.usuario = new UsuarioModel();
    this.submitted = false;
  }
  
   }


