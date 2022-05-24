import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
//import { AuthService } from 'src/app/services/auth.service';
import { FotoService } from 'src/app/services/foto.service';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {


  mostrarPregunta:any;
  pregunta:any;
  reordenado:any;
  puntos:number=0;
  estadoBoton:boolean=true;
  img:any;
  indiceImg:number=0;

  logedUser:any = null;
  mail:any=null;
  usuario:any;
  //mostrarPreguntasDesor:any;
  //noRepetirPregunta:any;
  // de forma ordenada a cada pregunta le corresponde sus 4 respuestas
   PREGUNTAS = [["CUANTO ES 2+2","math"], ["¿Que representa NA en la tabla periodica?","chemistry"], ["¿En que posicion te colocas si adelantas al segundo?","ingenuity"]];
   RESPUESTAS= [["4","3","1","3"],["sodio","agua","cloruro de sodio","sal"],["segundo","primero","tercero","ultimo"]];
  preguntas: Array<{ pregunta: string, respuesta: string, precionado: string,correcta:string,tematica:string }>=[];
  respurestas: Array<{respuesta:string, estado:string, precionado: boolean,correcta:string }>=[];
hola=["dsf"];
  constructor(private servFoto: FotoService,private authServise: AuthService,private firestore: FirestoreService) {
   //this.auth.getData(this.PREGUNTAS[this.mostrarPregunta][1]);
   }
  ngOnInit(): void {
    console.log("array",this.hola.length);
    console.log("array",this.hola[0] );

    this.crear();
     console.log("arrrrr",this.PREGUNTAS.length);
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
     
     /*this.arrayContainer.push(unRepartidor.payload.doc.data());
      console.log(unRepartidor.payload.doc.data());*/
     }
       });
      
     })
  }
   buscarFoto(){
   /* let input=this.PREGUNTAS[this.mostrarPregunta][1];
    const key="23517984-a89dce5bf6f23e232b41d2b55";
    var URL = "https://pixabay.com/api/?key="+key+"&q="+input;
    const respuesta=await fetch(URL);
    const resultado=await respuesta.json();
    let imagenes=resultado.hits;
    console.log(imagenes);
    console.log(imagenes[0].pageURL);
    this.img=await imagenes[0].previewURL;
    console.log(this.img);*/
   /* console.log("sdf");
    this.auth.getData(this.PREGUNTAS[this.mostrarPregunta][1]).subscribe((data)=>{
     this.img=data.photos;
     console.log("sdfasdf"+this.img);
    }  ,(error) =>{
        console.log(error)
      }
   );
console.log("2321313");
   /*const client = createClient('563492ad6f917000010000017845ba4eec114c5d80f0ba3a60583829');
    const query = 'Nature';
   client.photos.search({ query, per_page: 1 }).then(photos => {
   });*/
   console.log("el nnumero: ",this.mostrarPregunta);
   console.log("tema es: ",this.PREGUNTAS[this.mostrarPregunta][1]);
    this.servFoto.traerFoto(this.PREGUNTAS[this.mostrarPregunta][1]).subscribe(foto=>{
      console.info(foto);
     this.img=foto;
 
   })
this.indiceImg= Math.floor(Math.random() * (5 - 0)) + 0;
// console.log("la url es: ", this.img.hits[this.indiceImg].previewURL);
  }
async crear(){
  console.log("LARRGOO",this.PREGUNTAS.length);
  this.estadoBoton=true;

  this.preguntas=[];
  this.reordenado=[];
  this.respurestas=[];
  this.preguntas=[];
  this.indiceImg=0;
  this.img={};
  //console.log(this.PREGUNTAS.length);

  
   this.mostrarPregunta=Math.floor(Math.random() *  this.PREGUNTAS.length );
  // alert(this.mostrarPregunta);
  // console.log(this.mostrarPregunta);
 
  this.pregunta=this.PREGUNTAS[this.mostrarPregunta][0];
  for (let i = 0; i < this.RESPUESTAS[this.mostrarPregunta].length; i++) {
    if(i==0)
    {
          this.respurestas.push({ respuesta: this.RESPUESTAS[this.mostrarPregunta][i], estado:"boton-no-pulsado-aun",precionado:false,correcta:"correcto" });

    }
    else{
      this.respurestas.push({ respuesta: this.RESPUESTAS[this.mostrarPregunta][i], estado:"boton-no-pulsado-aun",precionado:false,correcta:"incorrecto" });

    }
   
}
//console.log("ssffs",this.PREGUNTAS[1][1]);
 await this.buscarFoto();
 this.reordenado=this.mezclar(this.respurestas.slice());
 console.log(this.PREGUNTAS);
 console.log(this.RESPUESTAS);
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
mezclar(array:any) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
//for()
//this.preguntasArray = this.mezclar(preguntas.slice());
async siguiente(){

 await this.PREGUNTAS.splice(this.mostrarPregunta,1);
 await this.RESPUESTAS.splice(this.mostrarPregunta,1);
 
  if(this.PREGUNTAS.length==0){
    this.terminoJuego();
  }
  else{
    this.crear();
  }
  
}
seleccionarRespuesta(respuesta:{respuesta:string, estado:string, precionado: boolean,correcta:string}){
   let correcta=false
  if(respuesta.correcta=="correcto"){
      respuesta.estado="boton-letra-acertada";
      this.puntos++;
      correcta=true
  }
  else{
    respuesta.estado="boton-letra-no-acertada";
    
  }
  for(let i=0; i<4;i++)//this.RESPUESTAS[this.mostrarPregunta].length;i++)
  {
     this.respurestas[i].precionado=true;
     console.log("hola");
     if(correcta==false && this.respurestas[i].correcta=="correcto"){
      this.respurestas[i].estado="boton-letra-acertada";

     }
  }
  this.estadoBoton=false;
 
}
terminoJuego(){
  let f=new Date();
  let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
  /*datosPuntos.push(fecha)
  datosPuntos.push(this.puntos)  */
  let datosPuntos:any={fecha:fecha,puntos:this.puntos};
  /* this.usuario.ahoracado.push(datosPuntos);*/
  this.usuario.preguntados.push(datosPuntos);
  this.firestore.actualizar('usuario',this.usuario.id,this.usuario).then(()=>{
  }
 )
   Swal.fire({
    title: 'TERMINO',
    text: "Acertaste un total de "+ this.puntos+" preguntas",
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Repetir',
    cancelButtonText: 'Cancelar'
  
  }).then((result) => {
    if (result.isConfirmed  ) {
      this.puntos=0;
// estadoBoton:boolean=true;
  //mostrarPreguntasDesor:any;
  //noRepetirPregunta:any;
  // de forma ordenada a cada pregunta le corresponde sus 4 respuestas
  this.PREGUNTAS = [["CUANTO ES 2+2","math"], ["¿Que representa NA en la tabla periodica?","chemistry"], ["¿En que posicion te colocas si adelantas al segundo?","ingenuity"]];
  this.RESPUESTAS= [["4","3","1","3"],["sodio","agua","cloruro de sodio","sal"],["segundo","primero","tercero","ultimo"]];
      this.crear();
   
    }
  })
}
}
