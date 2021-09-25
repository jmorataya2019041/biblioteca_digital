import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-revista',
  templateUrl: './revista.component.html',
  styleUrls: ['./revista.component.css'],
  providers: [UsuarioService]
})
export class RevistaComponent implements OnInit {
  public revistas = [];

  constructor(private titleService: Title, private usuarioService: UsuarioService) {
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

}
