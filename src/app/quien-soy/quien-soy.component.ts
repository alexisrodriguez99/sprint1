import { Component, OnInit } from '@angular/core';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit {

  constructor(private foto:FotoService ) { }
  imgMia:any;
  miHiHub:string="";
  miNombre:string="";
  datosRecu:any;
    ngOnInit(): void {
      this.datosGithub();
    }
  
    datosGithub(){
     this.foto.datosGithub().subscribe(dato=>{
       console.log(dato);
       this.datosRecu=dato;
       this.imgMia=this.datosRecu.avatar_url;
       this.miHiHub=this.datosRecu.html_url;
       this.miNombre=this.datosRecu.name;
          console.log("aaaaa: ",this.imgMia);
  
     })
    }

}
