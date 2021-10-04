import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css'],
  providers: [UsuarioService]
})
export class BusquedasComponent implements OnInit {
  searchTerm: string = '';
  resultados: any = {};
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private titleService: Title, private usuarioService: UsuarioService, private activeRoute: ActivatedRoute) {
    this.titleService.setTitle("Biblioteca Digital | Búsqueda")
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe( params => {
      this.searchTerm = params['term'];
      this.search(this.searchTerm)
      if( this.searchInput ) this.searchInput.nativeElement.value = this.searchTerm;
    })
  }

  search(term){
    this.usuarioService.busquedaLibro(term).subscribe(
      res => {
        this.resultados = res.Libro;
        console.log(this.resultados);
      },
      err => {
        console.error(err);
      }
    )
  }

  searchNew(value: String){
    if(value.length > 0 && value !== this.searchTerm){
      this.searchTerm = value.trim();
      this.search(this.searchTerm)
    }
  }

}
