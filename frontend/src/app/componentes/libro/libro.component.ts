import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
  providers: [UsuarioService]
})
export class LibroComponent implements OnInit {
  public libros = [];

  constructor(private titleService: Title, private usuarioService: UsuarioService) {
    this.titleService.setTitle("Biblioteca Digital | Libros")
   }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(){
    this.usuarioService.libros().subscribe(
      res => {
        this.libros = res.libros;
        console.log(this.libros);
      },
      err => {
        console.error(err);
      }
    )
  }

}
