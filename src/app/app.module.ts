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
import { TiporequerimientoComponent } from './components/catalogo/tiporequerimiento/tiporequerimiento.component';
import { CrearTiporeqComponent } from './components/configuracion/catalogo/tiporequerimiento/crear-tiporeq/crear-tiporeq.component';

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
    CrearTiporeqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
