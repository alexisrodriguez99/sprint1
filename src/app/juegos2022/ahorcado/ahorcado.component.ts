import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {
  readonly LETRAS = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N",
    "Ñ", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"];

readonly PALABRAS = ["CARACOLA", "TOCINO", "BARCELONA"];

botones: Array<{ letra: string, estado: string, precionado: boolean }>=[];

palabraAdivinadaPorAhora: string="";
palabraAAdivinar: string="";
fallos: Array<string>=[];
numFallos: number=0;
numAciertos: number=0;
contadorAlertError: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.inicializar();

  }
  inicializar(): void {
    this.contadorAlertError=0;    
    this.numFallos = 0;
    this.numAciertos = 0;
    this.fallos = [];
    this.botones = [];
    let numero = Math.floor(Math.random() * this.PALABRAS.length);
    this.palabraAAdivinar = this.PALABRAS[numero];

    this.generarPalabraAdivinadaPorAhora();
    this.inicializarBotones();
    //console.log(this.botones[0].estado);
}
  inicializarBotones(): void {
    for (let i = 0; i < this.LETRAS.length; i++) {
        this.botones.push({ letra: this.LETRAS[i], estado: "boton-no-pulsado-aun",precionado:false });
    }
}

generarPalabraAdivinadaPorAhora(): void {

    this.palabraAdivinadaPorAhora = "";
    for (let i = 0; i < this.palabraAAdivinar.length; i++) {
        this.palabraAdivinadaPorAhora += "-";
    }
}

botonClicked(boton: { letra: string, estado: string, precionado: boolean}): void {

    console.log(this.numFallos);
    if (!this.letraAcertada(boton.letra)) {
        if (this.numFallos < 5) {
            this.aumentarFallos(boton.letra);
        } else {

            if(this.contadorAlertError==0){
            this.aumentarFallos(boton.letra);

            this.mostrarMensajeDePerder();
            this.contadorAlertError++;
            }
         }
        boton.estado = "boton-letra-no-acertada";
        boton.precionado=true;
    } else {
      if (this.numAciertos == this.palabraAAdivinar.length) {
          this.mostrarMensajeDeGanar();
      }
      boton.estado = "boton-letra-acertada";
      boton.precionado=true;

  }
}

letraAcertada(letra: string): boolean {

    let letraAcertada = false;
    let longitud = this.palabraAAdivinar.length;

    for (let i = 0; i < longitud; i++) {
        if (letra == this.palabraAAdivinar[i]) {
            this.palabraAdivinadaPorAhora =
                (i == 0 ? "" : this.palabraAdivinadaPorAhora.substr(0, i)) +
                letra +
                this.palabraAdivinadaPorAhora.substr(i + 1);
            letraAcertada = true;
            this.numAciertos++;
        }
    }
    return letraAcertada;
}

aumentarFallos(letra: string): void {
    this.fallos.push(letra);
    this.numFallos++;
}

mostrarMensajeDePerder(): void {
    Swal.fire({
  title: 'PERDISTE',
  text: "Pulse repetir para jugar otra vez, o cancelar para seguir y averiguar la palabra",
  icon: 'error',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Repetir',
  cancelButtonText: 'Cancelar'
}).then((result) => {
    if (result.isConfirmed) {
        this.inicializar();
  }
})
}

mostrarMensajeDeGanar(): void {
    Swal.fire({
  title: 'GANASTE',
  text: "Pulse repetir para jugar otra vez",
  icon: 'success',
  showCancelButton: true,
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
}
