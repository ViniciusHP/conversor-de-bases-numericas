import { Injectable } from '@angular/core';
import { Historico } from './historico.model';

/**
 * Serviço responsável por guardar e gerenciar o histórico das conversões anteriores em memória
 * e no localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  private historicoConversao: Historico[] = [];

  constructor() {
    this.lerHistoricoArmazenadoLocalmente();
  }

  /**
   * Adiciona a conversão na matriz de histórico.
   * @param historico - Objeto com as informações da conversão.
   * @param indice - Índice de inserção do historico. Se omitido, será utilizado como 0.
   */
  adicionarAoHistorico(historico: Historico, indice: number = 0): void {
    this.historicoConversao.splice(indice, 0, historico);
    this.armazenarHistoricoLocalmente()
  }

  /**
   * Remove um objeto do histórico a partir do índice.
   * @param indice - Índice do item que se deseja remover.
   */
  removerDoHistorico(indice: number): void {
    this.historicoConversao.splice(indice, 1);
    this.armazenarHistoricoLocalmente()
  }

  /**
   * Retorna toda a matriz de histórico.
   * @returns Cópia da matriz de histórico.
   */
  obterHistorico(): Historico[] {
    return ([] as Historico[]).concat(this.historicoConversao);
  }

  /**
   * Obtém um item de histórico a partir de seu índice.
   * @param indice - Índice do item de histórico que se deseja consultar.
   * @returns Historico no índice especificado.
   */
  obterHistoricoNoIndice(indice: number): Historico {
    return this.historicoConversao[indice];
  }

  /**
   * Remove todo o histórico em memória e em localStorage.
   */
  limparTodoHistorico(): void {
    this.historicoConversao = [];
    this.armazenarHistoricoLocalmente()
  }

  /**
   * Armazena a matriz de histórico no localStorage
   */
  private armazenarHistoricoLocalmente(): void {
    localStorage.setItem(
      'historicoConversao',
      JSON.stringify(this.historicoConversao)
      );
  }

  /**
   * Lê a matriz de histórico no localStorage
   */
  private lerHistoricoArmazenadoLocalmente(): void {
    const historicoString = localStorage.getItem('historicoConversao');
    if (historicoString) {
      this.historicoConversao = JSON.parse(historicoString);
    }
  }
}
