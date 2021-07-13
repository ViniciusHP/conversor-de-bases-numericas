import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { HistoricoService } from '../historico.service';
import { Historico } from '../historico.model';

@Component({
  selector: 'app-historico-conversor',
  templateUrl: './historico-conversor.component.html',
  styleUrls: ['./historico-conversor.component.css'],
})
export class HistoricoConversorComponent implements OnInit {
  constructor(
    private historicoService: HistoricoService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  get dadosHistorico(): Historico[] {
    return this.historicoService.obterHistorico();
  }

  confirmacaoLimparHistorico(event: Event) {
    let target;
    if (event.target) target = event.target;
    this.confirmationService.confirm({
      target: target,
      message: 'Você confirma a exclusão de todos registros de histórico?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.historicoService.limparTodoHistorico();
      },
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
    });
  }

  removerHistorico(indice: number) {
    this.historicoService.removerDoHistorico(indice);
  }
}
