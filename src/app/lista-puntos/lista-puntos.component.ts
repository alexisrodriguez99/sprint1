import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FotoService } from 'src/app/services/foto.service';
 import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
@Component({
  selector: 'app-lista-puntos',
  templateUrl: './lista-puntos.component.html',
  styleUrls: ['./lista-puntos.component.scss']
})
export class ListaPuntosComponent implements OnInit {
  imgPreguntados:any;
  logedUser:any = null;
  mail:any=null;
  usuario:any;
  listamayormenor:any="wew";
  constructor(private router:Router,private servFoto: FotoService,private authServise: AuthService,private firestore: FirestoreService) { }

  ngOnInit(): void {
    this.dameFoto();
    this.estaLogeado();
    this.firestore.obtenerTodos("usuario").subscribe((repatidor)=>{
     // this.arrayContainer=[];
      repatidor.forEach((unRepartidor:any)=>{
    
        let lista:any;
    //if(unRepartidor.estado=="listo sin entregar")
    lista=unRepartidor.payload.doc.data();
    if(lista.correo==this.mail){
      this.usuario=unRepartidor.payload.doc.data();
    console.log(this.usuario);
    this.listamayormenor=this.usuario.mayormenor;
    this.usuario.mijuego= this.ordenarPorBurbuja(this.usuario.mijuego);
    this.usuario.preguntados= this.ordenarPorBurbuja(this.usuario.preguntados);
    this.usuario.ahoracado= this.ordenarPorBurbuja(this.usuario.ahoracado);


       this.listamayormenor= this.ordenarPorBurbuja(this.listamayormenor);

    console.log(this.listamayormenor)
    //console.log(this.listamayormenor[1].puntos)*/

    /*this.arrayContainer.push(unRepartidor.payload.doc.data());
     console.log(unRepartidor.payload.doc.data());*/
    }
      });
     
    })

    
  }
  estaLogeado(){
    this.authServise.isAuth().subscribe(auth =>{
      if(auth){
        console.log(auth.uid);
        console.log(auth.displayName);
        console.log(auth.email);
        this.logedUser=true;
        this.mail=auth.email;
      }
      else
      {
        this.logedUser=false;
      }
    })
  }
  dameFoto(){
     
    this.servFoto.traerFoto("pregunta").subscribe(foto=>{
      console.info(foto);
     this.imgPreguntados=foto;
     console.log("UHHHH",this.imgPreguntados);
   })
 }

  ordenarPorBurbuja(arrayDesordenado: any[]): any {
  // Copia el array recibido
  let tempArray: any[] = arrayDesordenado;
  let volverAOrdenar: boolean = false
 // console.log(tempArray[1+1].puntos);
  // Recorre el array
  tempArray.forEach(function (valor, key) {

    if(tempArray[key + 1]){

      // Comprueba si el primero es mayor que el segundo y no esta en la última posición
      if (tempArray[key].puntos < tempArray[key + 1].puntos && tempArray.length - 1 != key) {
          // Intercambia la primera posición por la segunda
          let primerNum = tempArray[key]
          let segundoNum = tempArray[key + 1]
          tempArray[key] = segundoNum
          tempArray[key + 1] = primerNum
          // Si debe volver a ordenarlo
          volverAOrdenar = true
      }
    }
  })
  if (volverAOrdenar) {
    this.ordenarPorBurbuja(tempArray)
}
// Array ordenado
return tempArray
}
}
