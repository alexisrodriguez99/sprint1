import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaJuegosRoutingModule } from './lista-juegos-routing.module';
import { ListaJuegosComponent } from './lista-juegos.component';


@NgModule({
  declarations: [
    ListaJuegosComponent
  ],
  imports: [
    CommonModule,
    ListaJuegosRoutingModule
  ]
})
export class ListaJuegosModule { }
