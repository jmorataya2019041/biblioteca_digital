import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
  providers: [AdminService]
})
export class AllUserComponent implements OnInit {
  public usuarios;
  public buscado: String = '';
  public datos = '';
  opcionPrueba: string = '';
  public usuarioBuscado = [];
  @ViewChild('userInput') userInput!: ElementRef;

  constructor(private titleService: Title, private adminService: AdminService) {
    this.titleService.setTitle("Biblioteca Digital | Usuarios")
  }

  ngOnInit(): void {
    this.allUsers();
    this.opcionPrueba = 'todos'
  }

  allUsers(){
    this.adminService.allUsers().subscribe(
      res => {
        this.usuarios = res.usuarios;
        if(this.usuarios.length >= 1){
          this.datos = "lleno"
        }else if(this.usuarios.length === 0){
          this.datos = 'vacio'
        }
        console.log(this.datos);

      },
      err => {
        console.error(err);
      }
    )
  }

  buscarUsuario(term){
    this.adminService.buscarUsuario(term).subscribe(
      res => {
        this.usuarioBuscado = res.Usuario;
        console.log(this.usuarioBuscado);
        term = this.buscado;
      },
      error => {
        console.error(error);
      }
    )
  }

  selector(opcion){
    if(opcion === 'Buscar'){
      this.opcionPrueba = 'buscar';
    }else if(opcion === 'Todos'){
      this.opcionPrueba = 'todos';
    }
    console.log(this.opcionPrueba);
  }

}
