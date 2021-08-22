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
      case 8:
        return this.octal(valor);
      case 10:
        return this.decimal(valor);
      case 16:
        return this.hexadecimal(valor);
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
   * @returns valor binário formatado.
   */
  binaria(valorOriginal: string): string {
    return this.formatador(valorOriginal, true, 4, ' ');
  }

  /**
   * Formata o valor octal agrupando os números em 3 digitos
   * e cada grupo separado por um caractere de espaço.
   * Exemplo
   * {{ '22244004355245' | basesNumericas: 8 }}
   * formata para: '22 244 004 355 245'
   * @param valorOriginal - valor octal que será formatado.
   * @returns valor octal formatado.
   */
  octal(valorOriginal: string): string {
    return this.formatador(valorOriginal, false, 3, ' ');
  }

  /**
   * Formata o valor decimal agrupando os números em 3 digitos
   * e cada grupo separado por um caractere de ponto (.) .
   * Exemplo
   * {{ '1258963458725' | basesNumericas: 10 }}
   * formata para: '1.258.963.458.725'
   * @param valorOriginal - valor decimal que será formatado.
   * @returns valor decimal formatado.
   */
  decimal(valorOriginal: string): string {
    return this.formatador(valorOriginal, false, 3, '.');
  }

  /**
   * Formata o valor hexadecimal agrupando os números em 4 digitos
   * e cada grupo separado por um caractere de espaço.
   * Exemplo
   * {{ 'F36E2D7' | basesNumericas: 16 }}
   * formata para: 'F36 E2D7'
   * @param valorOriginal - valor hexadecimal que será formatado.
   * @returns valor hexadecimal formatado.
   */
  hexadecimal(valorOriginal: string): string {
    return this.formatador(valorOriginal, false, 4, ' ');
  }

  /**
   * Executa a transformação do valor.
   *
   * Exemplo
   *  this.formatador('111111111', true, 4, ' ');
   *  retornará: '0001 1111 1111'
   *
   *  this.formatador('22244004355245', false, 3, ' ');
   *  retornará: '22 244 004 355 245'
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

    // Remove sinal de mais e converte a string em um array com cada digito
    const todosOsDigitos: string[] = valorOriginal.replace(/\+/g, '').split('');

    // Adiciona os zeros a esquerda
    if(adicionarZerosAEsquerda){
      let quantidadeDeDigitosFaltantes =  numeroDeDigitosAgrupados - (todosOsDigitos.length % numeroDeDigitosAgrupados);
      quantidadeDeDigitosFaltantes = quantidadeDeDigitosFaltantes >= numeroDeDigitosAgrupados ? 0 : quantidadeDeDigitosFaltantes;
      const numerosFaltantes: string[] = new Array(quantidadeDeDigitosFaltantes).fill('0');
      todosOsDigitos.splice(0, 0, ...numerosFaltantes);
    }

    // Inverte o array dos digitos
    todosOsDigitos.reverse();

    // Coloca o separador de digitos especificado e retorna como uma string
    const valorFinalInvertido: string = todosOsDigitos.reduce((valorFinal, digitoAtual, indice) => {
      if(indice % numeroDeDigitosAgrupados === 0){
        return `${valorFinal}${separadorEntreDigitosAgrupados}${digitoAtual}`;
      }
      return `${valorFinal}${digitoAtual}`;
    });

    // Realiza a inversão dos digitos novamente
    return valorFinalInvertido.split('').reverse().join('');
  }

}
