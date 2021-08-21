import { Historico } from './../historico.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Objeto com o mapeamento entre a base numérica e o valor de parâmetro correspondente
 * para a pipe 'basesNumericas'.
 */
const mapeamentoBaseParametroPipe: { [key: string]: number } = {
  'Binária': 2,
  'Octal': 8,
  'Decimal': 10,
  'Hexadecimal': 16
};

/**
 * Função que faz correspondência entre o nome da base do histórico
 * e o parâmetro da pipe que deve ser utilizada para transformar o valor.
 * Caso nenhuma correspondência seja encontrada, retorna -1, não aplicando
 * nenhuma transformação no valor.
 * @param nomeBase - Nome da base numérica
 * @returns parâmetro que indica para pipe qual a base numérica que ela está trabalhando.
 */
function obtemValorCorrespondenteAoParametroDaPipe(nomeBase: string): number{
  const parametro = mapeamentoBaseParametroPipe[nomeBase];
  return parametro ? parametro : -1;
}

/**
 * Componente utilizado para exibir os dados relacionados a conversão
 * de uma base em outra, incluindo o valor inicial e o valor final.
 */
@Component({
  selector: 'app-card-historico',
  templateUrl: './card-historico.component.html',
  styleUrls: ['./card-historico.component.css']
})
export class CardHistoricoComponent implements OnInit {

  @Input() historico: Historico;
  @Output() onBotaoFechar = new EventEmitter<void>();

  paramPipeValorInicial: number;
  paramPipeValorFinal: number;

  constructor() { }

  /**
   * Inicializa os parâmetros para a pipe transformar os valores de acordo com a base numérica.
   */
  ngOnInit(): void {
    this.paramPipeValorInicial = obtemValorCorrespondenteAoParametroDaPipe(this.historico.baseInicial);
    this.paramPipeValorFinal = obtemValorCorrespondenteAoParametroDaPipe(this.historico.baseFinal);
  }

  /**
   * Notifica que o botão fechar foi pressionado.
   */
  emitBotaoFechar(): void {
    this.onBotaoFechar.emit();
  }
}
