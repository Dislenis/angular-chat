import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from'@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from './Interfaces/mensaje';
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class ChatServicesService {

  
  constructor(private http: HttpClient) { }

  //httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'} )};


  httpOptions : any    = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
    })
  };

  private url: string= 'http://localhost:8080';

  //USUARIO
  private recibirMsjURL: string = '/recibirMsj'; //recibir msj
  private mensajeURL: string = '/mensaje';//obtener msj
  private chatURL: string = '/chat/';//obtener msj
  private usuarioURL: string = '/usuario';//Mostrar usuario
  private crearUsuarioURL : string ='/usuario'; // Crear usuario



  //Obtener Mensajes
  getMensajes(id_emisor: number, id_receptor: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(this.url+this.mensajeURL + this.chatURL + id_emisor + "/" + id_receptor) //mostrar los mensajes
  }
//return this.http.post<Usuario>(`${this.usuarioURL + this.existeUsuarioURL}/${correo}`, password, this.httpOptions)


  //Enviar Mensaje
  
  enviarMensaje(mensaje: Mensaje){
    return this.http.post<Mensaje>(`${this.url+this.mensajeURL+this.recibirMsjURL}`,mensaje, this.httpOptions)
  }


  // Crear Usuario
  crearUsuarios(usuario:Usuario){
    return this.http.post<Usuario>(`${this.url+this.usuarioURL+this.crearUsuarioURL}`,usuario, this.httpOptions)// Crear usuario
  }

  
  //Mostrar Usuario
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url+this.usuarioURL) //mostrar usuario
  }




}


