import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url: string = 'http://213.169.2.45/mda/help-back/public/api';
  constructor(
    private http: HttpClient
  ) { }

  public listado(cust){
    return this.http.post(`${this.url}/agente/tickets`, cust);
  }

  public listadoAdmin(cust){
    return this.http.post(`${this.url}/agente/tickets-admin`, cust);
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

  public historial(cust: any){
    return this.http.post(`${this.url}/agente/historico`, cust);
  }
  
  public cambiarEstado(cust: any){
    return this.http.post(`${this.url}/agente/cambiar_estado`, cust);
  }

  public cambiarAgente(cust: any){
    return this.http.post(`${this.url}/agente/cambio_agente`, cust);
  }
}
