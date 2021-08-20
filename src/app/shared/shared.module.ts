import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesfazerComponent } from './desfazer/desfazer.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BotaoCopiarComponent } from './botao-copiar/botao-copiar.component';



@NgModule({
  declarations: [
    DesfazerComponent,
    BotaoCopiarComponent
  ],
  imports: [
    CommonModule,

    ButtonModule,
    TooltipModule
  ],
  exports: [
    DesfazerComponent,
    BotaoCopiarComponent
  ]
})
export class SharedModule { }
