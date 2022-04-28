import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { AngularFireDatabase,AngularFireObject,AngularFireList  } from '@angular/fire/compat/database';

 
 import { map } from 'rxjs/operators';
 import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  items: Observable<any>;
  item: any;
   itemsRef: AngularFireList<any>;
   mensaje: any;
   fechaActual:any;
   fechaMensaje:any;
   @ViewChild('scrollMe') private listadoMensajes!: ElementRef;

   constructor(private authServise: AuthService, private db: AngularFireDatabase   ) {      
     this.items=db.list('item').valueChanges();
   console.log("_______________________");

   this.itemsRef = db.list('item');
   // Use snapshotChanges().map() to store the key
   this.items = this.itemsRef.snapshotChanges().pipe(
     map(changes => 
       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
     )
   );
   console.log(this.items);
   
 }
 logedUser:any = null;
 mail:any=null;
 ngOnInit(): void {
   let f = new Date();
     this.fechaActual=f.getFullYear() + '-'  + (f.getMonth()+1) + '-' + f.getDate();

   this.estaLogeado();
   this.scrollear();
  
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
scrollear() {
  this.listadoMensajes.nativeElement.scrollTop = this.listadoMensajes.nativeElement.scrollHeight;
}
  crearMensaje( ){
    let verficar=this.mensaje;
    if(verficar=!null && verficar!="" && verficar!=undefined){
     let f = new Date();
  let hora;
    let fecha=f.getFullYear() + '-'  + (f.getMonth()+1) + '-' + f.getDate();
    // let hora=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
    let h = f.getHours();
    let m = f.getMinutes();
    if(h<10 && m<10){
          hora="0"+f.getHours()+":0"+f.getMinutes();

    }
    else if(h<10){
        hora="0"+f.getHours()+":"+f.getMinutes();

  }
  else if(m<10){
    hora=f.getHours()+":0"+f.getMinutes();


  }
  else{
    hora=f.getHours()+":"+f.getMinutes();

  }
     // let hora=h+":"+m;//+":"+f.getSeconds();

    this.db.list('item').push({content: this.mensaje, mail: this.mail, hora: hora, fecha: fecha});
   this.mensaje="";
  }
 // alert(this.mensaje+"no entre");

}
}
