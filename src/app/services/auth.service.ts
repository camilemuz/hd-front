import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://213.169.2.45/mda/help-back/public/api';

  public menuFuncionario = [
    { url: '/home', titulo: 'Home'},
    { url: '/solicitud', titulo: 'Solicitud' },
    { url: '/solicitudes', titulo: 'Solicitudes' },
  ];
  public menuAgente = [
    { url: '/home', titulo: 'Home' },
    // { url: '/solicitud', titulo: 'Solicitud' },
    { url: '/solicitud-agente', titulo: 'Solicitar Ticket' },
    { url: '/ticket', titulo: 'Tickets' }
  ];
  public menuAdmin = [
    { url: '/home', titulo: 'Home' },
    // { url: '/solicitud', titulo: 'Solicitud' },
    { url: '/solicitud-agente', titulo: 'Solicitar Ticket' },
    { url: '/ticket', titulo: 'Tickets' },
    // { url: '/registro', titulo: 'Registro' },
    { url: '/listado', titulo: 'Usuarios' },
    { url: '/dashboard', titulo: 'Dashboard' },
    { url: '/configuracion', titulo: 'Configuración' },
  ];

  constructor(
    private http: HttpClient
  ) { }


  public guardarUsuario(cust: any): Observable<any>{
    return this.http.post(this.url + '/registro', cust);
  }

  public crearUsuarioAdmin(cust: any): Observable<any>{
    return this.http.post(this.url + '/admin/registroAdmin', cust);
  }

  public entrarUsuario(cust: any): Observable<any>{
    return this.http.post(this.url + '/login', cust);
  }

  public recursoUsuario(cust: any): Observable<any>{
    return this.http.post(this.url + '/recurso_usuario', cust);
  }

  public index(cust){
    return this.http.post(this.url + '/admin/index', cust);
  }

  public usuarios (): Observable<any>{
    return this.http.get(this.url + '/parametros/usuarios');
  }

  public store(id: number, usuario: UsuarioModel){
    return this.http.put(this.url + '/admin/store/' + id, usuario);
  }
  public eliminar(usuario: UsuarioModel){
    return this.http.post(this.url + '/admin/eliminar', usuario);
  }
  
  public listarAgente(){
    return this.http.get(this.url + '/agente/listado');
  }

}


