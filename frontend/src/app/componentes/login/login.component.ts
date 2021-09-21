import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public user = {
    usuario: "",
    password: "",
    getToken: true
  }
  constructor(private TitleService: Title, private loginService: LoginService){
    this.TitleService.setTitle("Biblioteca Digital | Login")
  }
  ngOnInit(): void {
  }

  //Función para login
  login(){
    this.loginService.login(this.user).subscribe(
      res => {
        sessionStorage.setItem("authorization", res.token);
        Swal.fire("Ingreso Exitoso!", "Disfrute nuestra aplicación a lo máximo", "success")
      },
      err => {
        switch (err.error.mensaje) {
          case "Error en la petición":
            Swal.fire("Ingreso Incorrecto", "Hubo un error en la petición, intente de nuevo", "error")
            this.user = {
              usuario: "",
              password: "",
              getToken: true
            }
            break;
          case "La contraseña no coincide":
            Swal.fire("Ingreso Incorrecto", "La contraseña no coincide, intente de nuevo", "error")
            this.user = {
              usuario: "",
              password: "",
              getToken: true
            }
            break;
          case "El usuario no existe":
            Swal.fire("Ingreso Incorrecto", "Usuario Innexistente", "error")
            this.user = {
              usuario: "",
              password: "",
              getToken: true
            }
            break;
        }
      }
    )
  }
}
