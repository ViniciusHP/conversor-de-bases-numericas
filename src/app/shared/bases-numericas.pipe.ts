import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formata os valores nas bases Binária, Decimal, Octal e Hexadecimal,
 * agrupando os números e adicionando separador de acordo com a base.
 */
@Pipe({
  name: 'basesNumericas'
})
export class BasesNumericasPipe implements PipeTransform {

  transform(value: number | string, base: number): string {
    const valor = value.toString();

    switch(base) {
      case 2:
        return this.binaria(valor);
      default:
        return valor;
    }
  }


  /**
   * Formata o valor binário agrupando os números em 4 digitos
   * e cada grupo separado por um caractere de espaço.
   * Exemplo
   * {{ '110101110' | basesNumericas: 2 }}
   * formata para: '0001 1010 1110'
   * @param valorOriginal - valor binário que será formatado.
   */
  binaria(valorOriginal: string): string {
    return this.formatador(valorOriginal, true, 4, ' ');
  }

  /**
   * Executa a transformação do valor.
   *
   * Exemplo
   *  this.formatador('111111111', true, 4, ' ');
   *  retornará: 0001 1111 1111
   *
   * @param valorOriginal - Valor passado para a pipe
   * @param adicionarZerosAEsquerda - Flag que indica se deve ser adicionado zeros a esquerda.
   * @param numeroDeDigitosAgrupados - Número que indica em quantos dígitos os números devem ser agrupados.
   * @param separadorEntreDigitosAgrupados - Separador inserido entre os grupos de números.
   * @returns Valor formatado.
   */
  formatador(valorOriginal: string,
    adicionarZerosAEsquerda: boolean,
    numeroDeDigitosAgrupados: number,
    separadorEntreDigitosAgrupados: string) : string {

    const todosOsDigitos: string[] = valorOriginal.split('');

    if(adicionarZerosAEsquerda){
      let quantidadeDeDigitosFaltantes =  numeroDeDigitosAgrupados - (valorOriginal.length % numeroDeDigitosAgrupados);
      quantidadeDeDigitosFaltantes = quantidadeDeDigitosFaltantes >= numeroDeDigitosAgrupados ? 0 : quantidadeDeDigitosFaltantes;
      const numerosFaltantes: string[] = new Array(quantidadeDeDigitosFaltantes).fill('0');
      todosOsDigitos.splice(0, 0, ...numerosFaltantes);
    }

    return todosOsDigitos.reduce((valorFinal, digitoAtual, indice) => {
      if(indice % numeroDeDigitosAgrupados === 0){
        return `${valorFinal}${separadorEntreDigitosAgrupados}${digitoAtual}`;
      }
      return `${valorFinal}${digitoAtual}`;
    }, '');
  }

}
