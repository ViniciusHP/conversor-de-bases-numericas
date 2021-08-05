import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesfazerComponent } from './desfazer/desfazer.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    DesfazerComponent
  ],
  imports: [
    CommonModule,

    ButtonModule
  ],
  exports: [
    DesfazerComponent
  ]
})
export class SharedModule { }
