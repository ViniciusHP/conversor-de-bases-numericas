import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { TelaConversorComponent } from './tela-conversor/tela-conversor.component';
import { FormsModule } from '@angular/forms';
import { ConversorService } from './conversor.service';


@NgModule({
  declarations: [
    TelaConversorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    DropdownModule,
    ButtonModule
  ],
  exports: [TelaConversorComponent],
  providers: [ConversorService]
})
export class ConversorModule { }
