import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
 import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { JuegosComponent } from './juegos/juegos.component';
import { MayorOMenorComponent } from './juegos2022/mayor-omenor/mayor-omenor.component';
 import { PreguntadosComponent } from './juegos2022/preguntados/preguntados.component';
import { ListaPuntosComponent } from './lista-puntos/lista-puntos.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"home", component:HomeComponent},
  {path:"chat", component:ChatComponent,canActivate:[AuthGuard]},
  {path:"listaPuntos", component:ListaPuntosComponent,canActivate:[AuthGuard]},
  {path:"quienSoy", component:QuienSoyComponent},
  //{path:"juegos", component:JuegosComponent},
  {
    path:'juegos', component:JuegosComponent, children:[
      {path:'mayorMenor', component:MayorOMenorComponent}
    ]
  },
  /*{path:"juegos", component:JuegosComponent},
  {path:"juegos/ahorcado", component:AhorcadoComponent},
  {path:"juegos/preguntados", component:PreguntadosComponent},*/
  {path:"", redirectTo:"/home", pathMatch:"full"},
   { path: 'listaJuegos', loadChildren: () => import('./lista-juegos/lista-juegos.module').then(m => m.ListaJuegosModule) },
  {path:"**", component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
