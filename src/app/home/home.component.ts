import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/usert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authServise: AuthService,private router:Router) { }
  logedUser:any = null;
  mail:any=null;
  ngOnInit(): void {
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
}
