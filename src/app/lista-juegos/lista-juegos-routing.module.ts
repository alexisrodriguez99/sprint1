import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../juegos2022/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from '../juegos2022/mayor-omenor/mayor-omenor.component';
import { ListaJuegosComponent } from './lista-juegos.component';

const routes: Routes = [{ path: '', component: ListaJuegosComponent, children:[
  {path:'mayorMenor', component:MayorOMenorComponent},
  { path: 'ahorcado', component: AhorcadoComponent },

] },
//{ path: 'ahorcado', component: AhorcadoComponent },
//{ path: 'mayorMenor', component: MayorOMenorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaJuegosRoutingModule { }
