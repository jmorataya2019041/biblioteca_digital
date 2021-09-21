import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Global } from '../Global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: String;

  constructor(private http: HttpClient, private router: Router) {
    this.url = Global.url;
   }

   //Función para hacer el login
   login(user: any){
     return this.http.post<any>(this.url + '/login', user)
   }

   //Función de registro
   registro(user: any){
     return this.http.post(this.url + '/registro', user)
   }
}
