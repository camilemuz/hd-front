import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {TicketModel} from '../../models/ticket.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {TicketHistoricoModel} from '../../models/ticketHistorico.model';
import {RequerimientoModel} from '../../models/requerimiento.model';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  public tickets: TicketModel[] = [];
  public radio: number;
  public idTicket: number;
  public ticketHistorico: TicketHistoricoModel[] = [];
  public requerimiento: RequerimientoModel;

  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listadoTickets();
  }

  private listadoTickets(){
    Swal.fire({
      icon: 'info',
      title: 'Cargando Tickets...',
      text: 'Espere un momento por favor!',
    });
    Swal.showLoading();
    let cust = {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('usuario')
    }
    this.ticketService.listadoFuncionario(cust).subscribe((resp: any) => {
      if (resp.respuesta){
        this.tickets = resp.tickets;
        Swal.close();
      }else{
        Swal.fire({
          icon: 'warning',
          title: 'Alerta',
          text: resp.mensaje,
        });
      }
    });
  }

  public evaluar(id: number, content){
    this.modalService.open(content, { size: 'sm' });
    this.idTicket = id;
    this.radio = null;
  }

  public aceptar(){
    Swal.fire({
      icon: 'info',
      title: 'Procesando',
      text: 'Espere un momento por favor!',
    });
    Swal.showLoading();
    let cust = {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('usuario'),
      ticket: this.idTicket,
      calificacion: this.radio
    }
    this.ticketService.calificacion(cust).subscribe((resp: any) => {
      if (resp.respuesta){
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: resp.mensaje,
        });
      }else {
        Swal.fire({
          icon: 'warning',
          title: 'Alerta',
          text: resp.mensaje,
        });
      }
    });
  }

  public historial(numero: number, content){
    let cust = {
      email: localStorage.getItem('usuario'),
      token: localStorage.getItem('token'),
      numero: numero
    }
    this.ticketService.historial(cust).subscribe((resp: any) => {
      if (resp.respuesta){
        this.ticketHistorico = resp.tickets;
        this.requerimiento = resp.requerimiento;
        this.modalService.open(content, { size: 'lg' });
      }
    });
  }

}
