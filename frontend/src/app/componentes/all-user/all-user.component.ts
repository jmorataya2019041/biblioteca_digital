import { Component, OnInit } from '@angular/core';
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
  public datos = '';

  constructor(private titleService: Title, private adminService: AdminService) {
    this.titleService.setTitle("Biblioteca Digital | Usuarios")
  }

  ngOnInit(): void {
    this.allUsers();
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
      },
      err => {
        console.error(err);
      }
    )
  }

}
