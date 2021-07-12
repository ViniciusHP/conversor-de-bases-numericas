import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { TelaConversorComponent } from './tela-conversor/tela-conversor.component';
import { ConversorService } from './conversor.service';
import { FormularioConversorComponent } from './formulario-conversor/formulario-conversor.component';
import { HistoricoConversorComponent } from './historico-conversor/historico-conversor.component';
import { CardHistoricoComponent } from './card-historico/card-historico.component';


@NgModule({
  declarations: [
    TelaConversorComponent,
    FormularioConversorComponent,
    HistoricoConversorComponent,
    CardHistoricoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    DropdownModule,
    ButtonModule,
    MessagesModule,
    MessageModule
  ],
  exports: [TelaConversorComponent],
  providers: [ConversorService]
})
export class ConversorModule { }
