import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.scss']
})
export class MayorOMenorComponent implements OnInit {
  cartas: Array<{}>=[1,2,3,4,5,6,7,8,9,10];
  cartasMostrar:number=0;
  cartaAnterior:number=0;
  cartaNueva:number=0;
  puntos:number=0;
   constructor() { }

  ngOnInit(): void {
    console.log("sadas" +  Math.floor(Math.random() * this.cartas.length + 100));
    this.inicializar();
  }
  inicializar(): void {
    this.puntos=0;

    this.generarCarta();
    console.log(this.cartasMostrar);

  }
  generarCarta(): number {
   return this.cartasMostrar=Math.floor(Math.random() *  this.cartas.length + 1);
}
  mayor(){
    this.cartaAnterior=this.cartasMostrar;
   this.cartaNueva= this.generarCarta();
   this.cartasMostrar=this.cartaNueva;
    if(this.cartaAnterior<this.cartaNueva)
    {
      this.puntos++;
    }
    else if(this.cartaNueva==this.cartaAnterior)
    {
      this.mensajeRepitio();
    }
    else{
       setTimeout(() => {
       this.mensajePerdio();
     },300);
    }
  }
  menor(){
    this.cartaAnterior=this.cartasMostrar;
    this.cartaNueva= this.generarCarta();
    this.cartasMostrar=this.cartaNueva;
     if(this.cartaAnterior>this.cartaNueva)
     {
      this.puntos++;

     }
     else if(this.cartaNueva==this.cartaAnterior)
     {
      this.mensajeRepitio();
     }
     else{
        setTimeout(() => {
        this.mensajePerdio();
      },300);
     }
  }
  removerCarta ( arr:Array<{}>, item:number ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

mensajePerdio(){
  let texto:string= 'Pulse repetir para jugar otra vez,\r\n'; 
  texto+=" SU PUNTUACION FINAL FUE: " + this.puntos;
  Swal.fire({
    title: 'PERDISTE',
    text: texto ,
    icon: 'error',
   // showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Repetir',
    cancelButtonText: 'Cancelar'
  
  }).then((result) => {
    if (result.isConfirmed  ) {
      this.inicializar();
   
    }
  })
}
mensajeRepitio(){
   
  Swal.fire({
    title: "NO CUENTA" ,
    text: "Carta repetida, precione Ok para seguir con el juego" ,
    icon: 'info',
   // showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancelar'
  
  }) 
}
}
