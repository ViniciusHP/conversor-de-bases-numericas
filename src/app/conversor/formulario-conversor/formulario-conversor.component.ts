import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from 'src/app/core/sidebar.service';
import { ConversorService } from '../conversor.service';
import { HistoricoService } from '../historico.service';

interface FuncaoQueDevolvePromise {
  (valor: string): Promise<string>;
}

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

  valorAntigoBaseInicial: string;
  valorAntigoBaseFinal: string;

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

  configurarTiposDeConversao() {
    this.tiposDeBases = [
      { label: 'Binária', value: 'Binária', disabled: false },
      { label: 'Octal', value: 'Octal', disabled: false },
      { label: 'Decimal', value: 'Decimal', disabled: false },
      { label: 'Hexadecimal', value: 'Hexadecimal', disabled: false },
    ];
  }

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

  configurarMapeamentoBasePattern() {
    this.mapeamentoBasePattern = {
      Binária: this.conversorService.patternBinario,
      Decimal: this.conversorService.patternDecimal,
      Octal: this.conversorService.patternOctal,
      Hexadecimal: this.conversorService.patternHexadecimal,
    };
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      baseInicial: [null, Validators.required],
      valorInicial: [null, Validators.required],
      baseFinal: [null, Validators.required],
      valorFinal: [],
    });
  }

  converter(): void {

    const chave = `${this.formulario.get('baseInicial')?.value}-${
      this.formulario.get('baseFinal')?.value
    }`;
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

  ouvinteDropdownBaseInicial(event: any) {
    const valor = event.value;
    this.desabilitarOpcaoDropdown(valor);
    this.habilitarOpcaoDropdown(this.valorAntigoBaseInicial);
    this.valorAntigoBaseInicial = valor;

    const regexpCampoValorInicial = this.mapeamentoBasePattern[valor];
    this.formulario
      .get('valorInicial')
      ?.setValidators([
        Validators.required,
        Validators.pattern(regexpCampoValorInicial),
      ]);
    this.formulario.get('valorInicial')?.updateValueAndValidity();
  }

  ouvinteDropdownBaseFinal(event: any) {
    const valor = event.value;
    this.desabilitarOpcaoDropdown(valor);
    this.habilitarOpcaoDropdown(this.valorAntigoBaseFinal);
    this.valorAntigoBaseFinal = valor;
  }

  desabilitarOpcaoDropdown(valor: string) {
    this.tiposDeBases.forEach((obj) => {
      if (obj.value === valor) {
        obj.disabled = true;
      }
    });
  }

  habilitarOpcaoDropdown(valor: string) {
    this.tiposDeBases.forEach((obj) => {
      if (obj.value === valor) {
        obj.disabled = false;
      }
    });
  }

  /**
   * Indica se tanto a base inicial quanto a base final foi selecionada
   */
  get basesForamSelecionadas(): boolean {
    return (this.formulario.get('baseInicial')?.value && this.formulario.get('baseFinal')?.value);
  }

  /**
   * Inverte a seleção das bases nos dropdowns e os valores nos campos de texto
   */
  inverterSelecao(): void {
    const dropdownBaseInicial = this.formulario.get('baseInicial');
    const dropdownBaseFinal = this.formulario.get('baseFinal');
    const inputValorInicial = this.formulario.get('valorInicial');
    const inputValorFinal = this.formulario.get('valorFinal');

    const baseTemporaria = dropdownBaseInicial?.value;
    dropdownBaseInicial?.setValue(dropdownBaseFinal?.value);
    dropdownBaseFinal?.setValue(baseTemporaria);

    const valorTemporario = inputValorInicial?.value;
    inputValorInicial?.setValue(inputValorFinal?.value);
    inputValorFinal?.setValue(valorTemporario);

    const regexpCampoValorInicial = this.mapeamentoBasePattern[inputValorInicial?.value];
    inputValorInicial?.setValidators([
        Validators.required,
        Validators.pattern(regexpCampoValorInicial),
    ]);

    dropdownBaseInicial?.updateValueAndValidity();
    dropdownBaseFinal?.updateValueAndValidity();
    inputValorInicial?.updateValueAndValidity();
  }
}
