import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { Departamento } from 'src/app/models/departamento.model';
import { Municipio } from 'src/app/models/municipio.model';
import { PrioridadModel } from 'src/app/models/prioridad.model';
import { RequerimientoModel } from 'src/app/models/requerimiento.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { Sucursal } from 'src/app/models/sucursal.model';
import { TicketModel } from 'src/app/models/ticket.model';
import { TicketHistoricoModel } from 'src/app/models/ticketHistorico.model';
import { TipoRequerimiento } from 'src/app/models/tipoRequerimiento.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TicketService } from 'src/app/services/ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.component.html',
  styleUrls: ['./ticket-admin.component.css']
})
export class TicketAdminComponent implements OnInit {

  public tickets: TicketModel[] = [];
  public ticketsAll: TicketModel[] = [];
  public tiket: TicketModel;  
  public ticketHistorico: TicketHistoricoModel[] = [];
  public requerimiento: RequerimientoModel;
  public ver: boolean = false;  
  public solicitud: Solicitud;
  public categorias: CategoriaModel[] = [];
  public tipoRequerimientos: TipoRequerimiento[] = [];
  public viewRequerimiento: boolean = false;
  public municipios: Municipio[] = [];
  public sucursales: Sucursal[] = [];
  public departamentos: Departamento[] = [];
  public prioridades: PrioridadModel[]=[];
  public agentes: UsuarioModel[] = [];
  public agente: UsuarioModel;
  modal: NgbModalRef;
  
  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal,
    private solicitudService: SolicitudService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.listado();
  }

  private listado(){
    Swal.fire({
      icon: 'info',
      title: 'Cargando...',
      text: 'Espere un momento por favor!',
    });
    Swal.showLoading();
    this.ticketsAll = [];
    this.tickets = [];
  
    let cust = {
      email: localStorage.getItem('usuario'),
      token: localStorage.getItem('token')
    };
    this.ticketService.listadoAdmin(cust).subscribe((resp: any) => {
      if (resp.respuesta) {
        this.ticketsAll = resp.tickets;
        this.ticketsAll.forEach((value) => {
          // @ts-ignore
          if (value.estado_id_estado != 3) {
            this.tickets.push(value);
          }
        });
      }
      Swal.close();
    });
  }

  public detalle(data: TicketModel, content) {
    this.tiket = new TicketModel();
    Object.assign(this.tiket, data);
    console.log('ticket',this.tiket);
    // this.tickets.forEach((value) => {
    //   if (value.id_ticket == id) {
    //     this.tiket = value;
    //   }
    // });
    this.modalService.open(content, {size: 'lg'});
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
        Swal.fire({
          icon: 'info',
          title: 'Tomando Ticket...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
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
            Swal.close();
          }
        });
      }
    }) ;

  }

  public terminarTicket(id: number){
    Swal.fire({
      title: 'Enviar un comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Terminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      Swal.fire({
        icon: 'info',
        title: 'Terminando Ticket...',
        text: 'Espere un momento por favor!',
      });
      Swal.showLoading();
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
            Swal.close();
          }
        });
      }
    });
  }

  // public tecnologia(){
  //   this.tickets = [];
  //   this.ticketsAll.forEach((value) => {
  //     // @ts-ignore
  //     if (value.division_id_division == 1){
  //       this.tickets.push(value);
  //     }
  //   });
  // }

  public general(){
    this.tickets = [];
    this.tickets = this.ticketsAll;
  }

  public historial(numero: number, content){
    let cust = {
      email: localStorage.getItem('usuario'),
      token: localStorage.getItem('token'),
      numero: numero
    };
    this.ticketService.historial(cust).subscribe((resp: any) => {
      if (resp.respuesta) {
        this.ticketHistorico = resp.tickets;
        console.log('historico',this.ticketHistorico);
        this.requerimiento = resp.requerimiento;
        this.modalService.open(content, {size: 'lg'});
      }
    });
  }

  public editar(numero: number, content) {
    let cust = {
      email: localStorage.getItem('usuario'),
      token: localStorage.getItem('token'),
      numero: numero
    };
    this.solicitudService.categorias().subscribe((res: any) => {
      if (res.respuesta) {
        this.categorias = res.categorias;
      }
    });
    this.solicitudService.municipios().subscribe((res: any) => {
      if (res.respuesta) {
        this.municipios = res.municipios;
      }
    });
    this.solicitudService.departamentos().subscribe((res: any) => {
      if (res.respuesta) {
        this.departamentos = res.departamentos;
      }
    });
    
    this.ticketService.historial(cust).subscribe((resp: any) => {
      if (resp.respuesta) {
        this.ticketHistorico = resp.tickets;
        console.log('historicos1',this.ticketHistorico);
        this.requerimiento = resp.requerimiento;
        this.modalService.open(content, { size: 'lg' });
      }
    });
  }

  public sucursal() {
    this.solicitudService.sucursales(this.solicitud.municipio_id).subscribe((res: any) => {
      if (res.respuesta) {
        this.sucursales = res.sucursales;
      }
    });
  }

  public tipoRequerimiento() {
    this.solicitudService.requerimientos(this.solicitud.categoria_id).subscribe((res: any) => {
      if (res.respuesta) {
        this.tipoRequerimientos = res.tipoRequerimientos;
      }
    });
    this.solicitudService.prioridad().subscribe((res: any) => {
      if (res.respuesta) {
        this.prioridades = res.prioridades;
        // console.log('prioridad-->',res);
        
      }
    });
  }

  public editarRequerimiento(content, idRequerimiento: number) {
    this.solicitud = new Solicitud();
    this.solicitudService.detalleRequerimiento(idRequerimiento).subscribe((resp: any) => {
      if (resp.respuesta) {
        this.viewRequerimiento = true;
        this.solicitud = resp.requerimiento;
        this.solicitud.id_requerimiento = idRequerimiento;
        this.tipoRequerimiento();
        this.sucursal();
        this.modal = this.modalService.open(content, {size: 'xl'});
        console.log('AA-->',resp);
        
      }
      // console.log('a',resp);
    });
    
    
  }

  public confirmar() {
    Swal.fire({
      title: 'Pregunta',
      text: '¿Está seguro de modificar la Solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Editando solicitud...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.solicitud.token = localStorage.getItem('token');
        this.solicitud.email = localStorage.getItem('usuario');
        this.solicitudService.editarSolicitud(this.solicitud).subscribe((res: any) => {
          if (res.respuesta) {
            this.solicitud = new Solicitud();
            this.solicitud.categoria_id = 0;
            this.solicitud.municipio_id = 0;
            this.modalService.dismissAll();
            this.listado();
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
            Toast.fire({
              icon: 'success',
              title: 'Solicitud modificada con éxito'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.mensaje,
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Se ha cancelado la accion de modificar la solicitud',
          'warning'
        );
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

  public cambiarEstado(numero: string){
    Swal.fire({
      title: 'Pregunta',
      text: '¿Está seguro de modificar el Estado del Ticket?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Editando Estado...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        let cust = {
          numero: numero
        }
        this.ticketService.cambiarEstado(cust).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.modalService.dismissAll();
            this.listado();
            Swal.fire({
              title: 'Exito',
              text: resp.mensaje,
              icon: 'success'
            });
          }
        });
      }
    });
  }

  public cambiarAgente(numero: string, idTicket: number, content){
    this.agente = new UsuarioModel();
    this.authService.listarAgente().subscribe((resp: any) => {
      if (resp.respuesta){
        this.agentes = resp.agentes;
        this.agente.id_ticket = idTicket;
        this.modalService.open(content, {size: 'lg'});
      }
    });
  }
  public cambioAgente(){
    Swal.fire({
      title: 'Pregunta',
      text: '¿Está seguro de modificar el Agente del Ticket?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Editando Estado...',
          text: 'Espere un momento por favor!',
        });
        Swal.showLoading();
        this.ticketService.cambiarAgente(this.agente).subscribe((resp: any) => {
          if (resp.respuesta) {
            this.modalService.dismissAll();
            this.listado();
          }
          Swal.close();
        });
      }
    });
  }

  public mostrarArchivo(dataArchivo){
    console.log(dataArchivo);
    let auxiliar=dataArchivo.split(';');
    console.log(auxiliar);
    let auxiliar2=auxiliar[0].split('/');
    console.log(auxiliar2);
    
    const link=document.createElement("a");
    link.href=dataArchivo;
    let fecha= new Date();
    let usuario=localStorage.getItem('usuario');
    let nombre= `${usuario}${fecha.getDay()}-${fecha.getHours()}-${fecha.getMinutes()}-${fecha.getSeconds()}`;
    if(auxiliar2[1]== 'pdf'){
      link.download=`${nombre}.pdf`;
    } else if (auxiliar2[1] =='jpg'){
      link.download=`${nombre}.jpg`;
    } else if (auxiliar2[1] =='png'){
      link.download=`${nombre}.png`;
    } else if (auxiliar2[1] =='docx'){
      link.download=`${nombre}.docx`;
    } else if (auxiliar2[1] =='xlsx'){
      link.download=`${nombre}.xlsx`;
    }else if (auxiliar2[1] =='jpeg'){
      link.download=`${nombre}.jpeg`;
    } 
    link.click();
    // window.open(url,'_blank');
  }

}



