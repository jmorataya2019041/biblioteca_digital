import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [LoginService]
})
export class RegistroComponent implements OnInit {
  public usuario = {
    CUI: "",
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    rol: "",
    password: ""
  }
  showContent: Boolean = false;
  constructor(private spinnerService: NgxSpinnerService, private titleService: Title, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Biblioteca Digital | Registro")
  }

  //Función para registrar
  registrar(){
    this.loginService.registro(this.usuario).subscribe(
      res => {
        Swal.fire("Registro Exitoso!", "Hola "+this.usuario.nombre+", Ya puede iniciar sesión con este usuario.", "success")
        this.usuario = {
          CUI: "",
          nombre: "",
          apellido: "",
          usuario: "",
          email: "",
          rol: "",
          password: ""
        }
        this.router.navigate(["/login"])
      },
      err => {
        console.log(err);
        switch (err.error.mensaje) {
          case "Error en la petición":
            Swal.fire("Registro Incorrecto", "Hubo un error en la petición, intente de nuevo.", "error")
            this.usuario = {
              CUI: "",
              nombre: "",
              apellido: "",
              usuario: "",
              email: "",
              rol: "",
              password: ""
            }
            break;
          case "Usuario Existente!!!":
            Swal.fire("Registro Incorrecto", "El usuario es existente, pruebe de nuevo con otros datos.", "error")
            this.usuario = {
              CUI: "",
              nombre: "",
              apellido: "",
              usuario: "",
              email: "",
              rol: "",
              password: ""
            }
            break;
          case "Error en la petición al guardar al usuario":
            Swal.fire("Registro Incorrecto", "Hubo un error en la petición al guardar el usuario, intente de nuevo.", "error")
            this.usuario = {
              CUI: "",
              nombre: "",
              apellido: "",
              usuario: "",
              email: "",
              rol: "",
              password: ""
            }
            break;
          case "No se ha podido almacenar el usuario":
            Swal.fire("Registro Incorrecto", "No se ha podido guardar el usuario, intente de nuevo.", "error")
            this.usuario = {
              CUI: "",
              nombre: "",
              apellido: "",
              usuario: "",
              email: "",
              rol: "",
              password: ""
            }
            break;
        }
      }
    )
  }

}
