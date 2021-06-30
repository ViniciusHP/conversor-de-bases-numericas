import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConversorService } from '../conversor.service';

interface FuncaoQueDevolvePromise {
  (valor: string): Promise<string>;
}

@Component({
  selector: 'app-tela-conversor',
  templateUrl: './tela-conversor.component.html',
  styleUrls: ['./tela-conversor.component.css']
})
export class TelaConversorComponent implements OnInit {

  tiposDeBases: Array<any>;
  formulario: FormGroup;
  convertendo: boolean;

  mapeamentoTipoDeConversao: { [key: string] : FuncaoQueDevolvePromise};
  mapeamentoRegexp: { [key: string] : string };

  valorAntigoBaseInicial: string;
  valorAntigoBaseFinal: string;

  constructor(
    private conversorService: ConversorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configurarTiposDeConversao();
    this.configurarMapeamentoDeConversao();
    this.configurarMapeamentoRegexp();
    this.configurarFormulario();
  }

  configurarTiposDeConversao() {
    this.tiposDeBases = [
      { label: 'Binária', value: 'Binária', disabled: false },
      { label: 'Octal', value: 'Octal', disabled: false },
      { label: 'Decimal', value: 'Decimal', disabled: false },
      { label: 'Hexadecimal', value: 'Hexadecimal', disabled: false }
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
      'Hexadecimal-Decimal': this.conversorService.converterHexadecimalParaDecimal
    };
  }

  configurarMapeamentoRegexp() {
    this.mapeamentoRegexp = {
      'Binária': ConversorService.regexpBinario,
      'Decimal': ConversorService.regexpDecimal,
      'Octal': ConversorService.regexpOctal,
      'Hexadecimal': ConversorService.regexpHexadecimal
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      baseInicial: [null, Validators.required],
      valorInicial: [null, Validators.required],
      baseFinal: [null, Validators.required],
      valorFinal: []
    });
  }

  converter(): void {
    this.convertendo = !this.convertendo;
    const chave = `${this.formulario.get('baseInicial')?.value}-${this.formulario.get('baseFinal')?.value}`;
    const funcaoDeConversao = this.mapeamentoTipoDeConversao[chave];

    if(!funcaoDeConversao){
      throw new Error(`Tipo de conversão inválida (${chave})`);
    }

    this.convertendo = true;
    funcaoDeConversao(this.formulario.get('valorInicial')?.value)
      .then((valorConvertido) => {
        this.formulario.get('valorFinal')?.setValue(valorConvertido);
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

    const regexpCampoValorInicial = this.mapeamentoRegexp[valor];
    this.formulario.get('valorInicial')?.setValidators(
      [
        Validators.required,
        Validators.pattern(regexpCampoValorInicial)
      ]
    );
    this.formulario.get('valorInicial')?.updateValueAndValidity();
  }

  ouvinteDropdownBaseFinal(event: any){
    const valor = event.value;
    this.desabilitarOpcaoDropdown(valor);
    this.habilitarOpcaoDropdown(this.valorAntigoBaseFinal);
    this.valorAntigoBaseFinal = valor;
  }

  desabilitarOpcaoDropdown(valor: string){
    this.tiposDeBases.forEach((obj) => {
      if(obj.value === valor){
        obj.disabled = true;
      }
    })
  }

  habilitarOpcaoDropdown(valor: string){
    this.tiposDeBases.forEach((obj) => {
      if(obj.value === valor){
        obj.disabled = false;
      }
    })
  }

}
