import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revista',
  templateUrl: './revista.component.html',
  styleUrls: ['./revista.component.css'],
  providers: [UsuarioService]
})
export class RevistaComponent implements OnInit {
  public revistas = [];

  constructor(private titleService: Title, private usuarioService: UsuarioService, private router: Router) {
    this.titleService.setTitle("Biblioteca Digital | Revistas")
  }

  ngOnInit(): void {
    this.obtenerRevistas();
  }

  obtenerRevistas(){
    this.usuarioService.revistas().subscribe(
      res => {
        this.revistas = res.revistas;
        console.log(this.revistas);
      },
      err => {
        console.error(err);
      }
    )
  }

  prestarBibliografia(id){
    this.usuarioService.prestarBibliografia(id).subscribe(
      res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Préstamo Exitoso!!!',
          text: '¿Quieres prestar otra bibliografía o verificar su préstamo?',
          showDenyButton: true,
          confirmButtonText: 'Verificar',
          denyButtonText: `Prestar otro`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/misPrestamos'])
          } else if (result.isDenied) {
            this.obtenerRevistas();
          }
        })
      },
      err => {
        console.log(err);
        switch (err.error.mensaje) {
          case "No tiene espacio para otro préstamo":
            Swal.fire('Error de préstamo', 'No tiene espacio suficiente para préstar otra bibliografía, regrese un libro e intente de nuevo.', 'error')
            break;
          case "La bibliografía no está disponible":
            Swal.fire('Error de préstamo', 'La bibliografía no tiene disponibilidad suficiente, regrese luego e intente de nuevo.', 'error')
          break;
          case "Error en la petición":
            Swal.fire('Error de préstamo', 'Error en la petición al buscar sus préstamos, intente de nuevo más tarde', 'error')
          break;
          case "Usted ya ha prestado esta bibliografía":
            Swal.fire('Error de préstamo', 'Usted ya ha prestado esta bibliografía', 'error')
          break;
          case "Error en la petición al guardar":
            Swal.fire('Error de préstamo', 'Error en la petición al guardar su préstamo, intente de nuevo más tarde.', 'error')
          break;
          case "No se ha podido almacenar el préstamo":
            Swal.fire('Error de préstamo', 'No se ha podido almacenar su préstamo, intente de nuevo más tarde.', 'error')
          break;
        }
      }
    )
  }

}
