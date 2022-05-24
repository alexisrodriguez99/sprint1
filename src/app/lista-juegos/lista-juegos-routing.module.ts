import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../juegos2022/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from '../juegos2022/mayor-omenor/mayor-omenor.component';
import { ListaJuegosComponent } from './lista-juegos.component';
import { MiJuegoComponent } from '../juegos2022/mi-juego/mi-juego.component';
import { PreguntadosComponent } from '../juegos2022/preguntados/preguntados.component';
import { AuthGuard } from '../services/auth.guard';
const routes: Routes = [{ path: '', component: ListaJuegosComponent, children:[
  {path:'mayorMenor', component:MayorOMenorComponent,canActivate:[AuthGuard]},
  { path: 'ahorcado', component: AhorcadoComponent ,canActivate:[AuthGuard]},
  {path:'miJuego', component:MiJuegoComponent,canActivate:[AuthGuard]},
  {path:'preguntados', component:PreguntadosComponent,canActivate:[AuthGuard]},
] },
//{ path: 'ahorcado', component: AhorcadoComponent },
//{ path: 'mayorMenor', component: MayorOMenorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaJuegosRoutingModule { }
