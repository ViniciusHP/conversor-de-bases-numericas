import { Component, OnInit } from '@angular/core';
import { HistoricoService } from '../historico.service';
import { Historico } from '../historico.model';

@Component({
  selector: 'app-historico-conversor',
  templateUrl: './historico-conversor.component.html',
  styleUrls: ['./historico-conversor.component.css'],
})
export class HistoricoConversorComponent implements OnInit {
  constructor(private historicoService: HistoricoService) {}

  ngOnInit(): void {}

  get dadosHistorico(): Historico[] {
    return this.historicoService.obterHistorico();
  }

  limparHistorico() {
    this.historicoService.limparTodoHistorico();
  }

  removerHistorico(indice: number) {
    this.historicoService.removerDoHistorico(indice);
  }
}
