import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private url: string = 'http://localhost/mda/help-back/public/api';

  constructor(
    private http: HttpClient
  ) { }

  public categorias(): Observable<any>{
    return this.http.get(this.url + '/parametros/categoria');
  }

  public requerimientos (id: number): Observable<any>{
    return this.http.get(this.url + '/parametros/tipo_requerimiento/' + id);
  }

  public municipios (): Observable<any>{
    return this.http.get(this.url + '/parametros/municipio');
  }

  public sucursales (id: number): Observable<any>{
    return this.http.get(this.url + '/parametros/sucursal/' + id);
  }

  public departamentos (): Observable<any>{
    return this.http.get(this.url + '/parametros/departamento');
  }

  public divisiones (): Observable<any>{
    return this.http.get(this.url + '/parametros/division');
  }

  public cargos (): Observable<any>{
    return this.http.get(this.url + '/parametros/cargo');
  }

  public guardarSolicitud(cust: any): Observable<any>{
    return this.http.post(this.url + '/funcionario/solicitar_req', cust);
  }

}
