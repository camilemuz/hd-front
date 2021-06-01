import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SolicitudComponent} from './components/solicitud/solicitud.component';
import {RegistroComponent} from './components/usuarios/registro/registro.component';
import {LoginComponent} from './components/usuarios/login/login.component';
import {NopagefoundComponent} from './components/nopagefound/nopagefound.component';
import {UsuarioComponent} from './components/usuario.component';
import {AuthGuard} from './guards/auth.guard';
import {TicketComponent} from './components/ticket/ticket.component';
import {HomeComponent} from './components/home/home.component';
import {SolicitudesComponent} from './components/solicitudes/solicitudes.component';
import { ListarUsuarioComponent } from './components/usuarios/listar-usuario/listar-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditarUsuarioComponent } from './components/usuarios/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: '',
    component: UsuarioComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent,  },      
      { path: 'solicitud', component: SolicitudComponent,  },      
      { path: 'solicitudes', component: SolicitudesComponent,  },      
      { path: 'listar-usuario', component: ListarUsuarioComponent,  },
      { path: 'editar-usuario/:id', component:EditarUsuarioComponent,  },
      // { path: 'registro', component: RegistroComponent },
      { path: 'ticket', component: TicketComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'solicitud', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
