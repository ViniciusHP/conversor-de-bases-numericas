import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaConversorComponent } from './tela-conversor/tela-conversor.component';



@NgModule({
  declarations: [
    TelaConversorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TelaConversorComponent]
})
export class ConversorModule { }
