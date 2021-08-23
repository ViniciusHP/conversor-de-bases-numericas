import { Component } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { HistoricoService } from '../historico.service';
import { Historico } from '../historico.model';
import { fade, listAnimation, smoothHeight } from 'src/app/animations/animations';
import { DesfazerService } from 'src/app/shared/desfazer.service';

/**
 * Componente responsável por listar todas as conversões que ocorreram anteriormente.
 */
@Component({
  selector: 'app-historico-conversor',
  templateUrl: './historico-conversor.component.html',
  styleUrls: ['./historico-conversor.component.css'],
  animations: [listAnimation, smoothHeight, fade]
})
export class HistoricoConversorComponent{
  constructor(
    private historicoService: HistoricoService,
    private confirmationService: ConfirmationService,
    private desfazerService: DesfazerService
  ) {}

  /**
   * Matriz com todos os dados de conversões anteriores.
   */
  get dadosHistorico(): Historico[] {
    return this.historicoService.obterHistorico();
  }

  /**
   * Método que realiza uma confirmação antes de limpar todo o histórico.
   * @param event - Objeto de evento
   */
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
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-danger p-button-text'
    });
  }

  /**
   * Remove um item do histórico a partir de seu índice.
   * @param indice - Índice do item que deve ser removido.
   */
  removerHistorico(indice: number) {
    let historico = this.historicoService.obterHistoricoNoIndice(indice);
    this.historicoService.removerDoHistorico(indice);

    this.desfazerService.exibirOpcaoDesfazer({texto: 'Item excluído',
      onClick: () => {
        this.historicoService.adicionarAoHistorico(historico, indice);
      }
    });
  }
}
