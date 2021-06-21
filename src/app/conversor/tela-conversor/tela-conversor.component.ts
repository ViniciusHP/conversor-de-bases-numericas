import { Component, OnInit } from '@angular/core';
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

  dadosDoFormulario = new DadoDeCoversao();

  bases = [
    { label: 'Binária', value: 'Binária' },
    { label: 'Octal', value: 'Octal' },
    { label: 'Decimal', value: 'Decimal' },
    { label: 'Hexadecimal', value: 'Hexadecimal' }
  ];

  mapeamentoTipoDeConversao: { [key: string] : FuncaoQueDevolvePromise};

  constructor(
    private conversorService: ConversorService
  ) {
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
      'Hexadecimal-Binária': this.conversorService.converterHexadecimalParaBinario
    };
  }

  ngOnInit(): void {

  }

  converter(): void {
    const chave = `${this.dadosDoFormulario.baseInicial}-${this.dadosDoFormulario.baseFinal}`;
    const funcaoDeConversao = this.mapeamentoTipoDeConversao[chave];

    if(!funcaoDeConversao){
      throw new Error(`Tipo de conversão inválida (${chave})`);
    }

    console.log(`Tipo de conversão ${chave}`);

    if(this.dadosDoFormulario.valorInicial){
      funcaoDeConversao(this.dadosDoFormulario.valorInicial)
        .then((valorConvertido) => {
          this.dadosDoFormulario.valorFinal = valorConvertido
        });
    }
  }

}
