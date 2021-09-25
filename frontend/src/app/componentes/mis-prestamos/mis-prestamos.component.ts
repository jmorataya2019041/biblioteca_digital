import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-prestamos',
  templateUrl: './mis-prestamos.component.html',
  styleUrls: ['./mis-prestamos.component.css'],
  providers: [UsuarioService]
})
export class MisPrestamosComponent implements OnInit {
  public prestamos = [];

  constructor(private titleService: Title, private usuarioService: UsuarioService) {
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

}
