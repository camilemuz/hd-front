import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {TicketModel} from '../../models/ticket.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketHistoricoModel} from '../../models/ticketHistorico.model';
import {RequerimientoModel} from '../../models/requerimiento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  public tickets: TicketModel[] = [];
  public ticketsAll: TicketModel[] = [];
  public tiket: TicketModel;
  public ticketHistorico: TicketHistoricoModel[] = [];
  public requerimiento: RequerimientoModel;
  public ver: boolean = false;

  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listado();
  }

  private listado(){
    this.ticketService.listado().subscribe((resp: any) => {
      if (resp.respuesta){
        this.ticketsAll = resp.tickets;
        this.ticketsAll.forEach((value) => {
          // @ts-ignore
          if (value.estado_id_estado != 3){
            this.tickets.push(value);
          }
        });
      }
    });
  }

  public detalle(id: number, content){
    this.tiket = new TicketModel();
    this.tickets.forEach((value) => {
      if (value.id_ticket == id) {
        this.tiket = value;
      }
    });
    this.modalService.open(content, { size: 'lg' });
  }

  public tomarTicket(id: number){
    Swal.fire({
      title: 'Enviar un comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Tomar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let cust = {
          email: localStorage.getItem('usuario'),
          idTicket: id,
          token: localStorage.getItem('token'),
          comentario: result.value
        };
        this.ticketService.tomar(cust).subscribe((resp: any) => {
          if (resp.respuesta){
            this.listado();
            this.modalService.dismissAll();
          }
        });
      }
    })

  }

  public terminarTicket(id: number){
    Swal.fire({
      title: 'Enviar un comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Tomar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let cust = {
          email: localStorage.getItem('usuario'),
          idTicket: id,
          token: localStorage.getItem('token'),
          comentario: result.value
        };
        this.ticketService.terminar(cust).subscribe((resp: any) => {
          if (resp.respuesta){
            this.listado();
            this.modalService.dismissAll();
          }
        });
      }
    })
  }

  public tecnologia(){
    this.tickets = [];
    this.ticketsAll.forEach((value) => {
      // @ts-ignore
      if (value.division_id_division == 1){
        this.tickets.push(value);
      }
    });
  }

  public general(){
    this.tickets = [];
    this.tickets = this.ticketsAll;
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

  public verTodos(){
    this.ver = !this.ver;
    console.log(this.ver);
    this.tickets = [];
    if (!this.ver){
      this.ticketsAll.forEach((value) => {
        // @ts-ignore
        if (value.estado_id_estado != 3){
          this.tickets.push(value);
        }
      });
    }else{
      this.tickets = this.ticketsAll;
    }

  }
}


