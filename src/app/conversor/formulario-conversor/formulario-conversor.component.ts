import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from 'src/app/core/sidebar.service';
import { ConversorService } from '../conversor.service';
import { HistoricoService } from '../historico.service';

interface FuncaoQueDevolvePromise {
  (valor: string): Promise<string>;
}

/**
 * Componente de formulário de conversão de bases.
 */
@Component({
  selector: 'app-formulario-conversor',
  templateUrl: './formulario-conversor.component.html',
  styleUrls: ['./formulario-conversor.component.css'],
})
export class FormularioConversorComponent implements OnInit {
  tiposDeBases: Array<any>;
  formulario: FormGroup;
  convertendo: boolean;

  mapeamentoTipoDeConversao: { [key: string]: FuncaoQueDevolvePromise };
  mapeamentoBasePattern: { [key: string]: string };

  private _baseInicial: string;
  private _baseFinal: string;

  constructor(
    private conversorService: ConversorService,
    private formBuilder: FormBuilder,
    private historicoService: HistoricoService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.configurarTiposDeConversao();
    this.configurarMapeamentoDeConversao();
    this.configurarMapeamentoBasePattern();
    this.configurarFormulario();
  }

  /**
   * Inicializa o array de objetos com os tipos de bases que serão passadas para o dropdown.
   */
  configurarTiposDeConversao() {
    this.tiposDeBases = [
      { label: 'Binária', value: 'Binária', disabled: false },
      { label: 'Octal', value: 'Octal', disabled: false },
      { label: 'Decimal', value: 'Decimal', disabled: false },
      { label: 'Hexadecimal', value: 'Hexadecimal', disabled: false },
    ];
  }

  /**
   * Inicializa o objeto responsável por realizar o mapeamento das bases selecionadas e o método
   * correspondente para conversão do valor.
   */
  configurarMapeamentoDeConversao() {
    this.mapeamentoTipoDeConversao = {
      'Binária-Decimal': this.conversorService.converterBinarioParaDecimal,
      'Binária-Octal': this.conversorService.converterBinarioParaOctal,
      'Binária-Hexadecimal': this.conversorService.converterBinarioParaHexadecimal,
      'Decimal-Binária': this.conversorService.converterDecimalParaBinario,
      'Decimal-Octal': this.conversorService.converterDecimalParaOctal,
      'Decimal-Hexadecimal': this.conversorService.converterDecimalParaHexadecimal,
      'Octal-Binária': this.conversorService.converterOctalParaBinario,
      'Octal-Decimal': this.conversorService.converterOctalParaDecimal,
      'Octal-Hexadecimal': this.conversorService.converterOctalParaHexadecimal,
      'Hexadecimal-Binária': this.conversorService.converterHexadecimalParaBinario,
      'Hexadecimal-Octal': this.conversorService.converterHexadecimalParaOctal,
      'Hexadecimal-Decimal': this.conversorService.converterHexadecimalParaDecimal,
    };
  }

  /**
   * Inicializa o objeto responsável por mapear o nome da base e o padrão de caracteres que ela aceita.
   */
  configurarMapeamentoBasePattern() {
    this.mapeamentoBasePattern = {
      Binária: this.conversorService.patternBinario,
      Decimal: this.conversorService.patternDecimal,
      Octal: this.conversorService.patternOctal,
      Hexadecimal: this.conversorService.patternHexadecimal,
    };
  }

  /**
   * Inicializa o formulário.
   */
  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      baseInicial: [null, Validators.required],
      valorInicial: [null, Validators.required],
      baseFinal: [null, Validators.required],
      valorFinal: [],
    });
  }

  /**
   * Método encarregado de realizar a conversão do valor inicial na base inicial para
   * o valor final na base final.
   */
  converter(): void {

    const chave = `${this.baseInicial}-${this.baseFinal}`;
    const funcaoDeConversao = this.mapeamentoTipoDeConversao[chave];

    if (!funcaoDeConversao) {
      throw new Error(`Tipo de conversão inválida (${chave})`);
    }

    this.convertendo = true;
    funcaoDeConversao(this.formulario.get('valorInicial')?.value)
      .then((valorConvertido) => {
        this.formulario.get('valorFinal')?.setValue(valorConvertido);

        if(this.sidebarService.historicoHabilitado){
          this.historicoService.adicionarAoHistorico(this.formulario.value);
        }
      })
      .catch(() => {
        this.formulario.get('valorFinal')?.setValue('');
      })
      .finally(() => {
        this.convertendo = false;
      });
  }

  /**
   * Base numérica selecionada como base fonte.
   */
  get baseInicial(): string {
    return this._baseInicial;
  }
  set baseInicial(base: string) {
    this._baseInicial = base;
    this.atualizaSelecaoDeBases();

    const patternCampoValorInicial = this.mapeamentoBasePattern[base];
    const inputValorInicial = this.formulario.get('valorInicial');

    inputValorInicial?.setValidators([
      Validators.required,
      Validators.pattern(patternCampoValorInicial),
    ]);
    inputValorInicial?.updateValueAndValidity();
  }

  /**
   * Base numérica selecionada como alvo.
   */
  get baseFinal(): string {
    return this._baseFinal;
  }
  set baseFinal(base: string) {
    this._baseFinal = base;
    this.atualizaSelecaoDeBases();
  }

  /**
   * Método que recebe o evento de mudança de valor do dropdown referente a base inicial.
   * @param event - Evento do dropdown.
   */
  ouvinteDropdownBaseInicial(event: any) {
    this.baseInicial = event.value;
  }

  /**
   * Método que recebe o evento de mudança de valor do dropdown referente a base final.
   * @param event - Evento do dropdown.
   */
  ouvinteDropdownBaseFinal(event: any) {
    this.baseFinal = event.value;
  }

  /**
   * Método encarregado de habilitar ou desabilitar a seleção de uma opção do dropdown.
   * Este método é chamado toda vez que a baseInicial ou a baseFinal é alterada.
   */
  atualizaSelecaoDeBases(): void {
    this.tiposDeBases.forEach((base) => {
      if (base.value === this.baseInicial || base.value === this.baseFinal) {
        base.disabled = true;
      }else{
        base.disabled = false;
      }
    });
  }

  /**
   * Indica se tanto a base inicial quanto a base final foi selecionada.
   */
  get basesForamSelecionadas(): boolean {
    return !!(this.formulario.get('baseInicial')?.value && this.formulario.get('baseFinal')?.value);
  }

  /**
   * Atualiza a base inicial e a base final após a inversão de seus valores
   * nos controles
   */
  atualizaBasesAposInverterValores() {
    this.baseInicial = this.formulario.get('baseInicial')?.value;
    this.baseFinal = this.formulario.get('baseFinal')?.value;
  }

  /**
   * Matriz com os controles que terão seus valores trocados
   */
  get matrizControlesParaInverterValores(): Array<{ fonte: any, alvo: any }> {
    return [
      { fonte: this.formulario.get('baseInicial'), alvo:  this.formulario.get('baseFinal')},
      { fonte: this.formulario.get('valorInicial'), alvo:  this.formulario.get('valorFinal')},
    ];
  }
}
