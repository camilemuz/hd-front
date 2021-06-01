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
import { ListarUsuarioComponent } from './components/usuarios/listar-usuario/listar-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { CategoriaComponent } from './components/configuracion/catalogo/categoria/categoria.component';
import { MunicipioComponent } from './components/configuracion/lugar/municipio/municipio.component';
import { DepartamentoComponent } from './components/configuracion/lugar/departamento/departamento.component';
import { CargoComponent } from './components/configuracion/parametros/cargo/cargo.component';

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
    ListarUsuarioComponent,
    DashboardComponent,
    EditarUsuarioComponent,
    ConfiguracionComponent,
    CategoriaComponent,
    MunicipioComponent,
    DepartamentoComponent,
    CargoComponent
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
