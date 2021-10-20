import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from './Global.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: String;

  constructor(private http: HttpClient, private router: Router) {
    this.url = Global.url;
  }

  //Función para obtener mi usuario
  miUsuario(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.url + '/miUsuario', {headers: allHeaders})
  }

  //Función para eliminar mi usuario
  eliminarMiUsuario(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"))
    return this.http.delete(this.url + '/eliminarMiUsuario', {headers: allHeaders})
  }

  //Función para editar mi usuario
  editarMiUsuario(user: any){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"))
    return this.http.put(this.url + '/editarMiUsuario', user, {headers: allHeaders})
  }

  //Función para obtener mis préstamos
  misPrestamos(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"))
    return this.http.get<any>(this.url + '/misPrestamos', {headers: allHeaders})
  }

  //Función para obtener mi historial
  miHistorial(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"))
    return this.http.get<any>(this.url + '/miHistorial', {headers: allHeaders})
  }

  //Función para obtener los libros
  libros(){
    return this.http.get<any>(this.url + '/obtenerLibros')
  }

  //Función para obtener las revistas
  revistas(){
    return this.http.get<any>(this.url + '/obtenerRevistas')
  }

  //Función para buscar libro
  busquedaLibro(term: any){
    return this.http.get<any>(this.url + '/buscarLibro/'+term)
  }

  //Función para prestar una bibliografía
  prestarBibliografia(id: any){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.url + '/prestarBibliografia/'+id, {headers: allHeaders})
  }

  //Función para devolver una bibliografía
  devolverBibliografia(id: any){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allHeaders = headers.set("authorization", sessionStorage.getItem("authorization"))
    return this.http.get<any>(this.url + '/devolverLibro/'+id, {headers: allHeaders})
  }
}
