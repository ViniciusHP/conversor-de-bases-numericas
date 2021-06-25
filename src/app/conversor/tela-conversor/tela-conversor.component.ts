import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConversorService } from '../conversor.service';

export class DadoDeCoversao {
  constructor(
    public baseInicial?: string,
    public baseFinal?: string,
    public valorInicial?: string,
    public valorFinal?: string
  ) {}
}

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
  mapeamentoTipoDeConversao: { [key: string] : FuncaoQueDevolvePromise};
  formulario: FormGroup;

  constructor(
    private conversorService: ConversorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.configurarTiposDeConversao();
    this.configurarMapeamentoDeConversao();

    this.formulario = this.formBuilder.group({
      baseInicial: [null, Validators.required],
      valorInicial: [null, Validators.required],
      baseFinal: [null, Validators.required],
      valorFinal: []
    });
  }

  configurarTiposDeConversao() {
    this.tiposDeBases = [
      { label: 'Binária', value: 'Binária' },
      { label: 'Octal', value: 'Octal' },
      { label: 'Decimal', value: 'Decimal' },
      { label: 'Hexadecimal', value: 'Hexadecimal' }
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

  converter(): void {

    const chave = `${this.formulario.get('baseInicial')?.value}-${this.formulario.get('baseFinal')?.value}`;
    const funcaoDeConversao = this.mapeamentoTipoDeConversao[chave];

    if(!funcaoDeConversao){
      throw new Error(`Tipo de conversão inválida (${chave})`);
    }

    funcaoDeConversao(this.formulario.get('valorInicial')?.value)
      .then((valorConvertido) => {
        this.formulario.get('valorFinal')?.setValue(valorConvertido);
      });
  }

}
