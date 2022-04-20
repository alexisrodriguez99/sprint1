import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
//import {User} from '../shared/usert';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mail:string="";
   contrasenia:string="";
  loginForm = new FormGroup({
   // email:new FormControl(''),
    //password:new FormControl(''),
  })
  constructor(private authSvc:AuthService, private router:Router,private fs:FirestoreService) { }

  ngOnInit(): void {
  }
  async onLogin(email:any,password:any){

     
    try{
 
      const user= await this.authSvc.login(email.value, password.value);
      console.log(" "+user);
    if(typeof(user)=='string'){
      Swal.fire({title: 'Error',text: user,icon: 'error'});
      }
    else if(user){
      let f = new Date();
     // document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
      this.fs.crear('logs',{ mensaje:'El usuario '+email.value+' ha inicado sesion el dia '+f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + ' a las ' + f.getHours()+':'+f.getMinutes()+':'+f.getSeconds()});
      console.log("Entro");
      this.router.navigateByUrl('/');
    }
    }
    catch(error){
      console.log('Error->',error);
      
    }
    
  }
  userAdmin(){
    this.mail="admin@gmail.com";
    this.contrasenia="123456";
  }
  userJugador(){
    this.mail="jugador@gmail.com";
    this.contrasenia="123456";
  }

}
