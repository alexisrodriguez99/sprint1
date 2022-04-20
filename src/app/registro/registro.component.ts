import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../services/firestore.service';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router,private fs:FirestoreService) {}

  ngOnInit(): void {
  }
  async onRegister(email:any, password:any) {
      
     
    try {
      const user = await this.authSvc.register(email.value, password.value);
      console.log(" "+user);
      if(typeof(user)=='string'){
        Swal.fire({title: 'Error',text: user,icon: 'error'});
        }
      else if(user){
     // const isVerified = this.authSvc.isEmailVerified(user);
     // this.redirectUser(isVerified);
      this.fs.crear('usuario',{correo:email.value,clave:password.value});
      //para guardar en la firestore
     console.log("Entro");
    this.router.navigateByUrl('/home');
     }
    } catch (error:any) {
      console.log('Error', error.code);  
    }
  }
}
