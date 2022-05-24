
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, timer } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-mi-juego',
  templateUrl: './mi-juego.component.html',
  styleUrls: ['./mi-juego.component.scss']
})
export class MiJuegoComponent implements OnInit, OnDestroy {

  hola:string="";
  div1:boolean=true;
  div2:boolean=true;
  div3:boolean=true;
  div4:boolean=true;
  div5:boolean=true;
  div6:boolean=true;
  div7:boolean=true;
  div8:boolean=true;
  div9:boolean=true;
  div0:boolean=true;
  segundo:number=0;
  fallos:number=0;
 mostrarCirculo:number=0;
 puntos:number=0;
 circuloActual:number=-1;
 intervalo:number=0;
 //puntosTotal:number=0;
  parar:Subscription=new Subscription;
  inicio:boolean=false;
  pararContador:boolean=false;


  logedUser:any = null;
  mail:any=null;
  usuario:any;
  respuestaSalir:any=""
   constructor(private authServise: AuthService,private firestore: FirestoreService) { }
   //ciculos: Array<{ div1: boolean, div2: boolean, div3: boolean, div4: boolean, div5: boolean, div6: boolean, div7: boolean, div8: boolean, div9: boolean, div10: boolean }>=[false,false,false,false,false,false,false,false,false,false];
   circulos: Array<{ }>=[this.div0,this.div1,this.div2,this.div3,this.div4,this.div5,this.div6,this.div7,this.div8,this.div9];
   ngOnInit(): void {
    // this.ciculos.div1="true";
    this.inicio=false;
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
   ngOnDestroy():void{

    //this.parar.unsubscribe();

     this.respuestaSalir="y"
    //alert("hola");



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
 terst(){
   this.circulos[1]=true;
   alert(this.circulos[1]);
   this.hola="yellow";
 }
 inicializar(): void {
   this.div1=true;
   this.div2=true;
   this.div3=true;
   this.div4=true;
   this.div5=true;
   this.div6=true;
   this.div7=true;
   this.div8=true;
   this.div9=true;
   this.div0=true;
   this.circulos=[this.div0,this.div1,this.div2,this.div3,this.div4,this.div5,this.div6,this.div7,this.div8,this.div9];
   this.puntos=0;
   this.segundo=0;
   this.fallos=0;
 
   this.intervalo=0;
  // this.crearCirculo();
  setTimeout(() => {
 
  this.parar=segundos.subscribe(() =>{
     this.segundo++;
     if(this.segundo==3){
     
       this.segundo=0;
       if(this.intervalo!=0){
          this.fallos++;
       }
      
       this.intervalo++
       this.circulos[this.mostrarCirculo]=true; //ASI SI FUNCA EL UNSUBSCSRIBE =)
          this.crearCirculo();  
        
 
      }
 
      if(this.puntos+this.fallos==20)
      {
       // if(this.puntos==0)
       this.terminoJuego();
      }
     
    } );
  },2000);
   const segundos=interval(500);
   
  /* const parar=  */
  // this.parar.unsubscribe();
   // this.parar=interval(1000);
   
  /* const contador=interval(6000);
   contador.subscribe((n) =>{
     this.circulos[this.mostrarCirculo]=true;
      this.crearCirculo();
   } ); */
  
 
  
  //     this.fueraDeTiempo();
   
   
  // console.log(this.cartasMostrar);
 
 }
 crearCirculo(){
 do {
        this.mostrarCirculo=Math.floor(Math.random() *  this.circulos.length);//+1
     console.log("===");
   } while (this.mostrarCirculo==this.circuloActual  );
   //this.mostrarCirculo=Math.floor(Math.random() *  this.circulos.length);//+1
 
    this.circuloActual=this.mostrarCirculo;
    this.circulos[this.mostrarCirculo]=false;
    console.log("el numero del array: "+this.mostrarCirculo);
 
 }
 iniciar(){
   this.inicio=true;
  this.inicializar(); 
 }
 async reset(){
   //this.parar.unsubscribe();
   /*await this.parar.unsubscribe();
   alert("hola");*/
   this.pararContador=true;
   this.segundo=0;
   this.parar.unsubscribe();
   this.inicializar();
 }
 precionarCirculo(){
   //const contador=interval(6000);
   this.segundo=0;
   this.circulos[this.mostrarCirculo]=true;
   this.crearCirculo();
   this.puntos++;
  
 }
 async fueraDeTiempo(){
  await setTimeout(() => {
     this.circulos[this.mostrarCirculo]=true;
     
     this.crearCirculo();
   },1000);
  
 }
 terminoJuego(){
   this.parar.unsubscribe();

   this.inicio=false;
  let f=new Date();
  let fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
  /*datosPuntos.push(fecha)
  datosPuntos.push(this.puntos)  */
  let datosPuntos:any={fecha:fecha,puntos:(this.puntos/20)*100};
  /* this.usuario.ahoracado.push(datosPuntos);*/
  this.usuario.mijuego.push(datosPuntos);
  //this.usuario.mijuego.push((this.puntos/20)*100);
  this.firestore.actualizar('usuario',this.usuario.id,this.usuario).then(()=>{
  }
 )
   
   Swal.fire({
     title: 'TERMINO',
     text: "Pulse repetir para jugar otra vez, su presicion fue del: "+ (this.puntos/20)*100+"%",
     icon: 'success',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Repetir',
     cancelButtonText: 'Cancelar'
   
   }).then((result) => {
     if (result.isConfirmed  ) {
       this.reset();
    
     }
   })
 }
}
