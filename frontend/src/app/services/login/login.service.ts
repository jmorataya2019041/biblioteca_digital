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

   //Función para obtener la identidad del usuario
   obtenerIdentidad(){
     if(!sessionStorage.getItem("authorization")) return;

     const headers = new HttpHeaders();
     const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"))
     return this.http.get<any>(this.url + '/obtenerIdentidad', {headers: allHeaders})
   }

   //Función para cerrar sesión
   logout(){
     if(sessionStorage.getItem("authorization")){
       sessionStorage.removeItem("authorization");
       this.router.navigate(['/'])
     }
   }

   //Función para saber si está logeado
   loggedIn(): Boolean{
     return !!sessionStorage.getItem("authorization")
   }
}
