import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() { }

  converterBinarioParaOctal(valorBinario: string): Promise<string> {
    return new Promise((resolve, reject) => {

      let expoente = 0;
      const indiceFinal = valorBinario.length - 1;
      let soma = 0;

      let valorOctalInvertido = '';

      for(let indice = indiceFinal; indice >= 0; indice--) {
        soma += (Number(valorBinario.charAt(indice)) * Math.pow(2, expoente));
        expoente++;

        if(expoente == 3 || indice == 0){
          valorOctalInvertido = valorOctalInvertido.concat(soma.toString());
          expoente = 0;
          soma = 0;
        }
      }

      resolve(this.inverterOrdemDosNumeros(valorOctalInvertido));
    });
  }

  converterBinarioParaDecimal(valorBinario: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const base = 2;
        let expoente = 0;
        const indiceFinal = valorBinario.length - 1;
        let soma = 0;

        for(let indice = indiceFinal; indice >= 0; indice--) {
          const algarismo = Number(valorBinario.charAt(indice));
          soma += Math.pow(base, expoente) * algarismo;
          expoente++;
        }

        resolve(soma.toString());
    });
  }

  converterBinarioParaHexadecimal(valorBinario: string): Promise<string> {
    return new Promise((resolve, reject) => {

      let expoente = 0;
      const indiceFinal = valorBinario.length - 1;
      let soma = 0;

      let valorHexadecimalInvertido = '';

      for(let indice = indiceFinal; indice >= 0; indice--) {
        soma += (Number(valorBinario.charAt(indice)) * Math.pow(2, expoente));
        expoente++;

        if(expoente == 4 || indice == 0){
          const algarismoHexadecimal = this.getAlgarismoHexadecimalCorrespondente(soma.toString());
          valorHexadecimalInvertido = valorHexadecimalInvertido.concat(algarismoHexadecimal);
          expoente = 0;
          soma = 0;
        }
      }

      resolve(this.inverterOrdemDosNumeros(valorHexadecimalInvertido));
    })
  }

  converterDecimalParaBinario(valorDecimal: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let valor = Number(valorDecimal);
        const divisor = 2;
        if(valor < 2){
          resolve(valor.toString());
        }

        let valorBinarioInvertido = '';

        while(valor >= divisor) {
          const resto = valor % divisor;
          const quociente = Math.floor(valor / divisor);
          valorBinarioInvertido += resto.toString();

          if(quociente == 1){
            valorBinarioInvertido += quociente.toString();
          }

          valor = quociente;
        }

        resolve(this.inverterOrdemDosNumeros(valorBinarioInvertido));
    });
  }

  private inverterOrdemDosNumeros(numero: string): string {
    let numeroInvertido = '';
    for(let index = numero.length - 1; index >= 0; index--){
      numeroInvertido += numero.charAt(index);
    }
    return numeroInvertido;
  }

  private getAlgarismoHexadecimalCorrespondente(digitoDecimal: string): string {

    const conjuntoHexadecimal:  { [key: string]: string }  = {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': 'A',
      '11': 'B',
      '12': 'C',
      '13': 'D',
      '14': 'E',
      '15': 'F'
    }

    let valor = conjuntoHexadecimal[digitoDecimal];

    if(!valor) {
      throw new Error(`O digito '${digitoDecimal}' não é um dígito válido. `);
    }

    return valor;
  }
}
