import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesfazerComponent } from './desfazer/desfazer.component';



@NgModule({
  declarations: [
    DesfazerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DesfazerComponent
  ]
})
export class SharedModule { }
