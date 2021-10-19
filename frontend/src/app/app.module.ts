import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";

import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MyUserComponent } from './componentes/my-user/my-user.component';
import { MisPrestamosComponent } from './componentes/mis-prestamos/mis-prestamos.component';
import { MiHistorialComponent } from './componentes/mi-historial/mi-historial.component';
import { LibroComponent } from './componentes/libro/libro.component';
import { RevistaComponent } from './componentes/revista/revista.component';
import { AllUserComponent } from './componentes/all-user/all-user.component';
import { BusquedasComponent } from './componentes/busquedas/busquedas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistroComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    MyUserComponent,
    MisPrestamosComponent,
    MiHistorialComponent,
    LibroComponent,
    RevistaComponent,
    AllUserComponent,
    BusquedasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
