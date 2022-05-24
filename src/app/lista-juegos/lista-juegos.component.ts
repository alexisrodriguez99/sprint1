import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FotoService } from 'src/app/services/foto.service';

 @Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit,OnDestroy {

  imgPreguntados:any;
  constructor(private router:Router,private servFoto: FotoService) { }

  ngOnDestroy():void{
    alert("hola");
  }
  ngOnInit(): void {
    this.dameFoto();
  }
  ahorcados(){
    this.router.navigateByUrl('/listaJuegos/ahorcado');
  
  }
  mayorMenor(){
    this.router.navigateByUrl('/listaJuegos/mayorMenor');
  
  } 
  miJuego(){
    this.router.navigateByUrl('/listaJuegos/miJuego');
  
  } 
  preguntados(){
    this.router.navigateByUrl('/listaJuegos/preguntados');
  
  }
  dameFoto(){
     
    this.servFoto.traerFoto("pregunta").subscribe(foto=>{
      console.info(foto);
     this.imgPreguntados=foto;
     console.log("UHHHH",this.imgPreguntados);
   })
 }
}
