import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from './Global.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: String;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  //Función para obtener todos los usuario
  allUsers(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.url + '/obtenerUsuarios', {headers: allHeaders})
  }

  //Función para buscar un usuario por texto
  buscarUsuario(user: any){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"))
    return this.http.get<any>(this.url + '/buscarUsuario/'+user, {headers: allHeaders})
  }

}
