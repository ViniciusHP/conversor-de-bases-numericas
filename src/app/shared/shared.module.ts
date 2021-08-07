import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesfazerComponent } from './desfazer/desfazer.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    DesfazerComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,
    TooltipModule
  ],
  exports: [
    DesfazerComponent
  ]
})
export class SharedModule { }
