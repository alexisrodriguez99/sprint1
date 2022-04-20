import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/usert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authServise: AuthService,private router: Router) { }
  logedUser:any = null;
  ngOnInit(): void {
   this.estaLogeado();
  }
  logOut()
  {
    this.authServise.logout();
    console.log("saliendo");
    this.router.navigateByUrl('/home');

  }
estaLogeado(){
  this.authServise.isAuth().subscribe(auth =>{
    if(auth){
      console.log(auth.uid);
      console.log(auth.displayName);
      console.log(auth.email);
      this.logedUser=true;
    }
    else
    {
      this.logedUser=false;
    }
  })
}

}
