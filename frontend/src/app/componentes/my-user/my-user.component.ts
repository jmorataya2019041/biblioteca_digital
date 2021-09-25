import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.css']
})
export class MyUserComponent implements OnInit {
  public usuario;
  newUser = {
    CUI: '',
    nombre: '',
    apellido: '',
    usuario: '',
    email: ''
  };

  constructor(private titleService: Title, private usuarioService: UsuarioService, private router: Router) {
    this.titleService.setTitle("Biblioteca Digital | Mi Usuario")
   }

  ngOnInit(): void {
    this.miUsuario();
  }

  miUsuario(){
    this.usuarioService.miUsuario().subscribe(
      res => {
        this.usuario = res.miUsuario;
      },
      err => {
        console.error(err);
      }
    )
  }

  eliminarUsuario(){
    Swal.fire({
      title: 'Eliminar Usuario',
      text: "¿Estás seguro de eliminar el usuario: "+this.usuario.nombre+"?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#32CD32',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarMiUsuario().subscribe(
          res => {
            Swal.fire(
              'Usuario Eliminado!',
              'El usuario ha sido eliminado exitosamente.',
              'success'
            )
            this.router.navigate(['/login'])
          },
          err => {
            console.error(err);
            switch (err.error.mensaje) {
              case "Error en la petición":
                Swal.fire('Petición Fallida', 'Hubo un error en la petición, intente de nuevo.', 'error')
                break;
              case "No se ha podido eliminar el usuario":
                Swal.fire('Error al eliminar', 'No se pudo eliminar el usuario, intente de nuevo.', 'error')
                break;
            }
          }
        )
      }
    })
  }

  obtenerUsuario(){
    this.usuarioService.miUsuario().subscribe(
      res => {
        this.newUser = res.miUsuario;
      },
      err => {
        console.error(err);
      }
    )
  }

  editarUsuario(){
    this.usuarioService.editarMiUsuario(this.newUser).subscribe(
      res => {
        Swal.fire(
          'Usuario Editado!',
          'El usuario ha sido editado exitosamente.',
          'success'
        )
        this.miUsuario();
      },
      err => {
        console.error(err);
        switch (err.error.mensaje) {
          case "Error en la petición":
            Swal.fire("Petición Fallida", "Hubo un error en la petición, intente de nuevo.", "error");
            break;
          case "No se ha podido editar el usuario":
            Swal.fire("Error al editar", "No se pudo editar el usuario, intente de nuevo.", "error");
            break;
        }
      }
    )
  }

}
