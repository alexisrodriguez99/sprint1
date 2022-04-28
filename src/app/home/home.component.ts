import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/usert';
import { Router } from '@angular/router';
 import { AngularFireDatabase,AngularFireObject,AngularFireList  } from '@angular/fire/compat/database';
 import { Observable } from 'rxjs';
 import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  item: any;
   itemsRef: AngularFireList<any>;

 
  constructor(private authServise: AuthService,private router:Router, private db: AngularFireDatabase   ) { 
     

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
      //this.crear("otro");
  //  this.crear("owwo");
    this.estaLogeado();
    
}
  /*logOut()
  {
    this.authServise.logout();
    console.log("saliendo");
  }*/
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
juegos(){
  this.router.navigateByUrl('/juegos');

}
chat(){
  this.router.navigateByUrl('/chat');

}
quienSoy(){
  this.router.navigateByUrl('/quiensoy');
}
save(newName: string) {
  //this.itemRef.set({ name: newName });
}
crear(newName: string){
  this.db.list('item').push({content: newName, hola: "mails"});

}

crearMensaje(newName: string, mail: string){
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
 alert(hora);
  // let hora=h+":"+m;//+":"+f.getSeconds();

  this.db.list('item').push({content: newName, mail: mail, hora: hora, fecha: fecha});

}
}
