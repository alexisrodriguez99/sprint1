import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 @Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
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
}
