import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mi-historial',
  templateUrl: './mi-historial.component.html',
  styleUrls: ['./mi-historial.component.css'],
  providers: [UsuarioService]
})
export class MiHistorialComponent implements OnInit {
  public historial = [];

  constructor(private titleService: Title, private usuarioService: UsuarioService) {
    this.titleService.setTitle("Biblioteca Digital | Mi Historial")
  }

  ngOnInit(): void {
    this.miHistorial();
  }

  miHistorial(){
    this.usuarioService.miHistorial().subscribe(
      res => {
        this.historial = res.historial;
        console.log(this.historial);
      },
      err => {
        console.error(err);
      }
    )
  }

}
