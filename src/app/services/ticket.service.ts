import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url: string = 'http://localhost/mda/help-back/public/api';
  constructor(
    private http: HttpClient
  ) { }

  public listado(){
    return this.http.post(`${this.url}/agente/tickets`, null);
  }

  public listadoFuncionario(cust: any){
    return this.http.post(`${this.url}/funcionario/ver_solicitudes`, cust);
  }

  public calificacion(cust: any){
    return this.http.post(`${this.url}/funcionario/calificacion`, cust);
  }


  public elegir(cust: any){
    return this.http.post(`${this.url}/agente/elegir_ticket`, cust);
  }

  public tomar(cust: any){
    return this.http.post(`${this.url}/agente/tomar_ticket`, cust);
  }

  public terminar(cust: any){
    return this.http.post(`${this.url}/agente/terminar_ticket`, cust);
  }
}
