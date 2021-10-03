import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUserComponent } from './componentes/all-user/all-user.component';
import { BusquedasComponent } from './componentes/busquedas/busquedas.component';
import { HomeComponent } from './componentes/home/home.component';
import { LibroComponent } from './componentes/libro/libro.component';
import { LoginComponent } from './componentes/login/login.component';
import { MiHistorialComponent } from './componentes/mi-historial/mi-historial.component';
import { MisPrestamosComponent } from './componentes/mis-prestamos/mis-prestamos.component';
import { MyUserComponent } from './componentes/my-user/my-user.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RevistaComponent } from './componentes/revista/revista.component';

const routes: Routes = [
  {
    path: 'busqueda/:term',
    component: BusquedasComponent
  },
  {
    path: 'libros',
    component: LibroComponent
  },
  {
    path: 'revistas',
    component: RevistaComponent
  },
  {
    path: 'usuarios',
    component: AllUserComponent
  },
  {
    path: 'miHistorial',
    component: MiHistorialComponent
  },
  {
    path: 'misPrestamos',
    component: MisPrestamosComponent
  },
  {
    path: 'miUsuario',
    component: MyUserComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
