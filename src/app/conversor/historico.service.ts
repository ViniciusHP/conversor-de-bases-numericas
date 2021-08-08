import { Injectable } from '@angular/core';
import { Historico } from './historico.model';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  private historicoConversao: Historico[] = [];

  constructor() {
    this.lerHistoricoArmazenadoLocalmente();
  }

  adicionarAoHistorico(historico: Historico, indice: number = 0): void {
    this.historicoConversao.splice(indice, 0, historico);
    this.armazenarHistoricoLocalmente()
  }

  removerDoHistorico(indice: number): void {
    this.historicoConversao.splice(indice, 1);
    this.armazenarHistoricoLocalmente()
  }

  obterHistorico(): Historico[] {
    return ([] as Historico[]).concat(this.historicoConversao);
  }

  limparTodoHistorico(): void {
    this.historicoConversao = [];
    this.armazenarHistoricoLocalmente()
  }

  private armazenarHistoricoLocalmente(): void {
    localStorage.setItem(
      'historicoConversao',
      JSON.stringify(this.historicoConversao)
      );
  }

  private lerHistoricoArmazenadoLocalmente(): void {
    const historicoString = localStorage.getItem('historicoConversao');
    if (historicoString) {
      this.historicoConversao = JSON.parse(historicoString);
    }
  }
}
