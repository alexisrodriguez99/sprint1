import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
 import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { ErrorComponent } from './error/error.component';
  import { PreguntadosComponent } from './juegos2022/preguntados/preguntados.component';
 import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import { AhorcadoComponent } from './juegos2022/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './juegos2022/mayor-omenor/mayor-omenor.component';
import { JuegosComponent } from './juegos/juegos.component';
  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
     QuienSoyComponent,
     RegistroComponent,
     ErrorComponent,
        PreguntadosComponent,
      NavbarComponent,
      ChatComponent,
      AhorcadoComponent,
      MayorOMenorComponent,
      JuegosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFirestoreModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
