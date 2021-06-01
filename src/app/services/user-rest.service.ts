import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  private url='http://localhost/mda/help-back/public/api';
  users: Array<{id: number, nombre: string, ap_paterno: string, ap_materno: string, email: string}> = [];
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url+'/parametros/usuarios');
  }
  
  editUser(id: number): Observable<any> {
    return this.http.get(this.url+'/editar-usuario/'+id);
  }

  updateUser(form:any,id:any): Observable<any> {
    return this.http.put(this.url +'/editar-usuario/'+ id, form.value);
  }

  storeUser(form:any): Observable<any> {
    return this.http.post(this.url+'/usuarios',form.value);
  }

  deleteUser(id:any): Observable<any> {
    return this.http.delete(this.url+'/usuarios/'+ id);
  }
}