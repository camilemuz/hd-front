import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { MenuComponent } from './partials/menu/menu.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { PerfilComponent } from './components/usuarios/perfil/perfil.component';
import {HttpClientModule} from '@angular/common/http';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { UsuarioComponent } from './components/usuario.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { CalificacionPipe } from './pipes/calificacion.pipe';
import {IndexComponent} from './components/usuarios/index/index.component';
import { RolPipe } from './pipes/rol.pipe';
import { CargoPipe } from './pipes/cargo.pipe';
import { DivisionPipe } from './pipes/division.pipe';
import { EstadoPipe } from './pipes/estado.pipe';
import { CategoriaComponent } from './components/configuracion/catalogo/categoria/categoria.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { DepartamentoComponent } from './components/configuracion/lugar/departamento/departamento.component';
import { MunicipioComponent } from './components/configuracion/lugar/municipio/municipio.component';
import { CargoComponent } from './components/configuracion/parametros/cargo/cargo.component';
import { RegistroAdminComponent } from './components/usuarios/registro-admin/registro-admin.component';
import { CrearCategoriaComponent } from './components/configuracion/catalogo/categoria/crear-categoria/crear-categoria.component';
import { CrearDepartamentoComponent } from './components/configuracion/lugar/departamento/crear-departamento/crear-departamento.component';
import { CrearMunicipioComponent } from './components/configuracion/lugar/municipio/crear-municipio/crear-municipio.component';
import { CrearTiporeqComponent } from './components/configuracion/catalogo/tiporequerimiento/crear-tiporeq/crear-tiporeq.component';
import { TiporequerimientoComponent } from './components/configuracion/catalogo/tiporequerimiento/tiporequerimiento.component';
import { SolicitudAgenteComponent } from './components/solicitud-agente/solicitud-agente.component';
import { CategoriaPipe } from './pipes/categoria.pipe';
import { SucursalComponent } from './components/configuracion/lugar/sucursal/sucursal.component';
import { CrearSucursalComponent } from './components/configuracion/lugar/sucursal/crear-sucursal/crear-sucursal.component';
import { LugarPipe } from './pipes/lugar.pipe';
import { PrioridadPipe } from './pipes/prioridad.pipe';
import { CrearCargoComponent } from './components/configuracion/parametros/cargo/crear-cargo/crear-cargo.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TicketAdminComponent } from './components/ticket-admin/ticket-admin.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgSelect2Module } from 'ng-select2';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    SolicitudComponent,
    NavBarComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    NopagefoundComponent,
    UsuarioComponent,
    TicketComponent,
    HomeComponent,
    SolicitudesComponent,
    CalificacionPipe,
    IndexComponent,
    RolPipe,
    CargoPipe,
    DivisionPipe,
    EstadoPipe,
    CategoriaComponent,
    MunicipioComponent,
    CargoComponent,
    DepartamentoComponent,
    ConfiguracionComponent,
    RegistroAdminComponent,
    CrearCategoriaComponent,
    CrearDepartamentoComponent,
    CrearMunicipioComponent,
    TiporequerimientoComponent,
    CrearTiporeqComponent,
    SolicitudAgenteComponent,
    CategoriaPipe,
    SucursalComponent,
    CrearSucursalComponent,
    LugarPipe,
    PrioridadPipe,
    CrearCargoComponent,
    TicketAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RxReactiveFormsModule,
    DataTablesModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    BrowserAnimationsModule,
    NgSelect2Module,
    AutocompleteLibModule
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
