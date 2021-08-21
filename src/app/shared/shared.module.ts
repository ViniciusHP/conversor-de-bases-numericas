import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesfazerComponent } from './desfazer/desfazer.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BotaoCopiarComponent } from './botao-copiar/botao-copiar.component';
import { BasesNumericasPipe } from './bases-numericas.pipe';



@NgModule({
  declarations: [
    DesfazerComponent,
    BotaoCopiarComponent,
    BasesNumericasPipe
  ],
  imports: [
    CommonModule,

    ButtonModule,
    TooltipModule
  ],
  exports: [
    DesfazerComponent,
    BotaoCopiarComponent,
    BasesNumericasPipe
  ]
})
export class SharedModule { }
