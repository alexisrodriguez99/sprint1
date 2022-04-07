import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { JuegosComponent } from './juegos/juegos.component';
import { PreguntadosComponent } from './juegos2022/preguntados/preguntados.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"home", component:HomeComponent},
  {
    path:'juegos', component:JuegosComponent, children:[
      {path:'preguntados', component:PreguntadosComponent}
    ]
  },
  /*{path:"juegos", component:JuegosComponent},
  {path:"juegos/ahorcado", component:AhorcadoComponent},
  {path:"juegos/preguntados", component:PreguntadosComponent},*/
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
