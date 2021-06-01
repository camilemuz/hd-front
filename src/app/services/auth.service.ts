import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost/mda/help-back/public/api';

  public menuFuncionario = [
    { url: '/home', titulo: 'Home'},
    { url: '/solicitud', titulo: 'Solicitud' },
    { url: '/solicitudes', titulo: 'Solicitudes' },
  ];
  public menuAgente = [
    { url: '/home', titulo: 'Home' },
    { url: '/solicitud', titulo: 'Solicitud' },
    { url: '/ticket', titulo: 'Ticket' }
  ];
  public menuAdmin = [
    { url: '/home', titulo: 'Home' },
    { url: '/solicitud', titulo: 'Solicitud' },
    { url: '/ticket', titulo: 'Ticket' },
    { url: '/listar-usuario', titulo: 'Usuario' },
    // { url: '/configuracion', titulo: 'Configuración' },
    { url: '/dashboard', titulo: 'Dashboard' },
    { url: '/configuracion', titulo: 'Configuración' },
    { url: '/registro', titulo: 'Registro' },
  ];

  constructor(
    private http: HttpClient
  ) { }


  public guardarUsuario(cust: any): Observable<any>{
    return this.http.post(this.url + '/registro', cust);
  }

  public entrarUsuario(cust: any): Observable<any>{
    return this.http.post(this.url + '/login', cust);
  }

  public recursoUsuario(cust: any): Observable<any>{
    return this.http.post(this.url + '/recurso_usuario', cust);
  }
  public editarUsuario(cust:any,id:number){
    return this.http.put(this.url+'/editar_usuario/'+id,cust);
  }
}
