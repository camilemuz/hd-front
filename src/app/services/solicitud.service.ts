import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CategoriaModel } from '../models/categoria.model';
import { Departamento } from '../models/departamento.model';
import { Municipio } from '../models/municipio.model';
import {TipoRequerimiento} from '../models/tipoRequerimiento.model';

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

  public indexcat(cust): Observable<any>{
    return this.http.post(this.url + '/parametros/indexcat',cust);
  }

  public guardarcat(cust: any): Observable<any>{
    return this.http.post(this.url + '/parametros/storecat', cust);
  }

  public editarcategoria(id: number, categoria: CategoriaModel): Observable<any>{
    return this.http.put(this.url + '/parametros/updatecat/'+ id, categoria);
  }

  public eliminarcategoria( categoria: CategoriaModel): Observable<any>{
    return this.http.post(this.url + '/parametros/eliminarcat',categoria);
  }


  public requerimientos (id: number): Observable<any>{
    return this.http.get(this.url + '/parametros/tipo_requerimiento/' + id);
  }
  public indextiporeq(): Observable<any>{
    return this.http.get(this.url + '/parametros/indextiporeq');
  }

  public guardartiporeq(cust: any): Observable<any>{
    return this.http.post(this.url + '/parametros/storetiporeq', cust);
  }

  public editartiporeq(id: number, TipoRequerimiento: TipoRequerimiento): Observable<any>{
    return this.http.put(this.url + '/parametros/updattiporeq/'+ id, TipoRequerimiento);
  }

  public eliminartiporeq( tipoRequerimiento: TipoRequerimiento): Observable<any>{
    return this.http.post(this.url + '/parametros/eliminartiporeq',tipoRequerimiento);
  }


  public municipios (): Observable<any>{
    return this.http.get(this.url + '/parametros/municipio');
  }
  public indexmunicipio(): Observable<any>{
    return this.http.get(this.url + '/parametros/indexmun');
  }

  public guardarmun(cust: any): Observable<any>{
    return this.http.post(this.url + '/parametros/storemun', cust);
  }

  public editarmunicipio(id: number, municipio: Municipio): Observable<any>{
    return this.http.put(this.url + '/parametros/updatemun/'+ id, municipio);
  }

  public eliminarmunicipio( municipio: Municipio): Observable<any>{
    return this.http.post(this.url + '/parametros/eliminarmun',municipio);
  }


  public sucursales (id: number): Observable<any>{
    return this.http.get(this.url + '/parametros/sucursal/' + id);
  }


  public departamentos (): Observable<any>{
    return this.http.get(this.url + '/parametros/departamento');
  }

  public guardardpto(cust: any): Observable<any>{
    return this.http.post(this.url + '/parametros/storedpto', cust);
  }

  public indexDpto(cust): Observable<any>{
    return this.http.post(this.url + '/parametros/indexdpto',cust);
  }

  public editarDpto(id: number, departamento: Departamento): Observable<any>{
    return this.http.put(this.url + '/parametros/updatedpto/'+ id, departamento);
  }

  public eliminarDpto( departamento: Departamento): Observable<any>{
    return this.http.post(this.url + '/parametros/eliminardpto',departamento);
  }

  public divisiones (): Observable<any>{
    return this.http.get(this.url + '/parametros/division');
  }

  public cargos (): Observable<any>{
    return this.http.get(this.url + '/parametros/cargo');
  }

  public roles (): Observable<any>{
    return this.http.get(this.url + '/parametros/rol');
  }

  public guardarSolicitud(cust: any): Observable<any>{
    return this.http.post(this.url + '/funcionario/solicitar_req', cust);
  }

  public Solicitudagente(cust: any): Observable<any>{
    return this.http.post(this.url + '/funcionario/solicitud_agen', cust);
  }

  
  public editarSolicitud(cust: any): Observable<any>{
    return this.http.post(this.url + '/funcionario/editar_req', cust);
  }

  public detalleRequerimiento (idRequerimiento: number): Observable<any>{
    return this.http.get(this.url + '/agente/ticket/' + idRequerimiento);
  }


}
