import { Injectable } from '@angular/core';
import { Historico } from './historico.model';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  private historicoConversao: Historico[] = [];

  constructor() {}

  adicionarAoHistorico(historico: Historico): void{
    this.historicoConversao.unshift(historico);
  }

  removerDoHistorico(indice: number): void {
    this.historicoConversao.splice(indice, 1);
  }

  obterHistorico(): Historico[] {
    return ([] as Historico[]).concat(this.historicoConversao);
  }

  limparTodoHistorico(): void {
    this.historicoConversao = []
  }
}
