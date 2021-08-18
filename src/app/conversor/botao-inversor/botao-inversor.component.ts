import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Componente utilizado para realizar a troca de valores de campos de formulário
 */
@Component({
  selector: 'app-botao-inversor',
  templateUrl: './botao-inversor.component.html',
  styleUrls: ['./botao-inversor.component.css']
})
export class BotaoInversorComponent{

  @Input()
  matrizAbstractControls: Array<{fonte: AbstractControl, alvo: AbstractControl}>;

  @Input()
  disabled: boolean;

  @Output()
  onAfterInverterSelecao = new EventEmitter<void>();

  constructor() { }

  /**
   * Troca os valores dos campos de formulário
   */
   trocarValores(): void {
    this.matrizAbstractControls.forEach((controles) => {
      const controleFonte = controles.fonte;
      const controleAlvo = controles.alvo;

      const valorTemporario = controleFonte?.value;
      controleFonte.setValue(controleAlvo?.value);
      controleAlvo.setValue(valorTemporario);
    });

    this.onAfterInverterSelecao.emit();
  }
}
