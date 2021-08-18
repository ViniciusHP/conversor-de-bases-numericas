import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ConversorService } from './conversor.service';
import { FormularioConversorComponent } from './formulario-conversor/formulario-conversor.component';
import { HistoricoConversorComponent } from './historico-conversor/historico-conversor.component';
import { CardHistoricoComponent } from './card-historico/card-historico.component';
import { AnimationsModule } from '../animations/animations.module';
import { TooltipModule } from 'primeng/tooltip';
import { BotaoInversorComponent } from './botao-inversor/botao-inversor.component';

@NgModule({
  declarations: [
    FormularioConversorComponent,
    HistoricoConversorComponent,
    CardHistoricoComponent,
    BotaoInversorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    DropdownModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    TooltipModule,

    AnimationsModule
  ],
  exports: [FormularioConversorComponent, HistoricoConversorComponent],
  providers: [ConversorService],
})
export class ConversorModule {}
