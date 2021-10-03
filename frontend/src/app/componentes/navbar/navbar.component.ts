import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginService]
})
export class NavbarComponent implements OnInit {
  role = '';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerIdentidad();
  }

  obtenerIdentidad(){
    this.loginService.obtenerIdentidad().subscribe(
      res => {
        this.role = res.rol;
      },
      err => {
        console.error(err);
      }
    )
  }

  search

}
