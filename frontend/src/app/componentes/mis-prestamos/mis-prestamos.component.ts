import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-prestamos',
  templateUrl: './mis-prestamos.component.html',
  styleUrls: ['./mis-prestamos.component.css'],
  providers: [UsuarioService]
})
export class MisPrestamosComponent implements OnInit {
  public prestamos = [];

  constructor(private titleService: Title, private usuarioService: UsuarioService, private router: Router) {
    this.titleService.setTitle("Biblioteca Digital | Mis Prestamos")
   }

  ngOnInit(): void {
    this.misPrestamos();
  }

  misPrestamos(){
    this.usuarioService.misPrestamos().subscribe(
      res => {
        this.prestamos = res.misPrestamos;
        console.log(this.prestamos);
      },
      err => {
        console.error(err);
      }
    )
  }

  devolverLibro(id){
    this.usuarioService.devolverBibliografia(id).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Devolución Exitosa!!!',
          text: '¿Quieres devolver otra bibliografía o verificar su devolución?',
          showDenyButton: true,
          confirmButtonText: 'Verificar',
          denyButtonText: `Devolver otro`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/miHistorial'])
          } else if (result.isDenied) {
            this.misPrestamos();
          }
        })
        console.log(res);
      },
      err => {
        console.error(err);
        switch (err.error.mensaje) {
          case "El libro ya fue devuelto":
            Swal.fire('Error de devolución', 'El libro ya fue devuelto.', 'error')
            break;
          case "Error en la petición":
            Swal.fire('Error de devolución', 'Error en la petición, intente de nuevo.', 'error')
            break;
          case "No se ha podido devolver el libro":
            Swal.fire('Error de devolución', 'No se ha podido devolver la bibliografía.', 'error')
            break;
          case "Error en la petición al devolver el libro":
            Swal.fire('Error de devolución', 'Error en la petición al devolver la bibliografía, intente de nuevo.', 'error')
            break;
        }
      }
    )
  }

}
