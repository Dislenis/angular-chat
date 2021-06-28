import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatServicesService } from '../chat-services.service';
import { Mensaje } from '../Interfaces/mensaje';
import { Usuario } from '../usuario';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] ,
  providers: [DatePipe]

})



export class ChatComponent implements OnInit {

  chatForm = new FormGroup({
    msj: new FormControl('')
    
   
  });



  myDate:Date = new Date();
  
  constructor(private chatService: ChatServicesService, private datePipe: DatePipe){
      
  }


   Mensaje: Mensaje[] = [];
   Usuario:Usuario[]=[];
   
   msg : String="hola";

  ngOnInit(): void {
    this.getMensajes(1,3);
    this.getUsuarios();
  }


  getMensajes(id_emisor: number, id_receptor: number){
    this.chatService.getMensajes(id_emisor , id_receptor).subscribe(
     Mensaje => {
        this.Mensaje= Mensaje;
        console.log(Mensaje)
      }
    )
  }

  //Este metodo se llama desde el HTML
   enviarMensaje() {


 
    

    let miMensaje: Mensaje = {
      id: Math.floor((Math.random()*6)+1),
      id_emisor : 1,
      id_receptor:3,
      estado_mensaje: true,
      feacha: formatDate(Date.now(),'yyyy-MM-ddTHH:MM:ss','en-US'),
      mensaje : this.chatForm.controls['msj'].value
    }

    //usamos chatService de tipo ChatServicesService que llama a enviarMensaje del servicio
    this.chatService.enviarMensaje(miMensaje).subscribe(
      res => {
        console.log(res)
      },
      error => {
        alert('No se ha podido enviar tu mensaje')
        console.log(error)
      }
    )
    this.getMensajes(1,3);
  }


  getUsuarios(){
    this.chatService.getUsuarios().subscribe(
     Usuario => {
        this.Usuario= Usuario;
        console.log(Usuario)
      }
    )
  }
}
