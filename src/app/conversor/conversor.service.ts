import { Injectable } from '@angular/core';
import { inverterOrdemDosNumeros, obtemAlgarismoHexadecimalCorrespondenteAoDecimal } from './conversor-helper'

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

      resolve(inverterOrdemDosNumeros(valorOctalInvertido));
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
          const algarismoHexadecimal = obtemAlgarismoHexadecimalCorrespondenteAoDecimal(soma.toString());
          valorHexadecimalInvertido = valorHexadecimalInvertido.concat(algarismoHexadecimal);
          expoente = 0;
          soma = 0;
        }
      }

      resolve(inverterOrdemDosNumeros(valorHexadecimalInvertido));
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

        resolve(inverterOrdemDosNumeros(valorBinarioInvertido));
    });
  }

  converterDecimalParaOctal(valorDecimal: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let valor = Number(valorDecimal);
        const divisor = 8;
        if(valor < 8){
          resolve(valor.toString());
        }

        let valorOctalInvertido = '';

        while(valor >= divisor) {
          const resto = valor % divisor;
          const quociente = Math.floor(valor / divisor);
          valorOctalInvertido += resto.toString();

          if(quociente < 8){
            valorOctalInvertido += quociente.toString();
          }

          valor = quociente;
        }

        resolve(inverterOrdemDosNumeros(valorOctalInvertido));
    });
  }
}
