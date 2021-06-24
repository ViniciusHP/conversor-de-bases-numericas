import { Injectable } from '@angular/core';
import { inverterOrdemDosNumeros, converterAlgarismoDecimalParaHexadecimal,
  converterAlgarismoOctalParaBinario, converterAlgarismoHexadecimalParaBinario,
  converterAlgarismoHexadecimalParaDecimal, removerZerosAEsquerda } from './conversor-helper'

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  public regexpBinario = /[0-1]+/g;
  public regexpDecimal = /[0-9]+/g;
  public regexpOctal = /[0-7]+/g;
  public regexpHexadecimal= /[a-fA-F0-9]+/g;

  constructor() {
    // Fazendo binding do this
    this.converterOctalParaHexadecimal = this.converterOctalParaHexadecimal.bind(this);
    this.converterHexadecimalParaOctal = this.converterHexadecimalParaOctal.bind(this);
  }

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
          const algarismoHexadecimal = converterAlgarismoDecimalParaHexadecimal(soma.toString());
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

  converterDecimalParaHexadecimal(valorDecimal: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let valor = Number(valorDecimal);
        const divisor = 16;
        if(valor < 16){
          resolve(converterAlgarismoDecimalParaHexadecimal(valor.toString()));
        }

        let valorHexadecimalInvertido = '';

        while(valor >= divisor) {
          const resto = valor % divisor;
          const quociente = Math.floor(valor / divisor);
          valorHexadecimalInvertido += converterAlgarismoDecimalParaHexadecimal(resto.toString());

          if(quociente < 16){
            valorHexadecimalInvertido += converterAlgarismoDecimalParaHexadecimal(quociente.toString());
          }

          valor = quociente;
        }

        resolve(inverterOrdemDosNumeros(valorHexadecimalInvertido));
    });
  }

  converterOctalParaBinario(valorOctal: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let valorBinario = '';
      const indiceFinal = valorOctal.length - 1;
      for(let indice = indiceFinal; indice >= 0; indice--){
        const algarismo = valorOctal.charAt(indice);
        const binario = converterAlgarismoOctalParaBinario(algarismo);
        valorBinario = binario.concat(valorBinario);
      }
      resolve(removerZerosAEsquerda(valorBinario));
    });
  }

  converterOctalParaDecimal(valorOctal: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const indiceFinal = valorOctal.length - 1;
      let expoente = 0;
      let soma = 0;
      for(let indice = indiceFinal; indice >= 0; indice--){
        let algarismo = Number(valorOctal.charAt(indice));
        soma += (Math.pow(8, expoente) * algarismo);
        expoente++;
      }

      resolve(soma.toString());
    });
  }

  converterOctalParaHexadecimal(valorOctal: string): Promise<string> {
    return this.converterOctalParaBinario(valorOctal)
      .then((valorBinario: string) => this.converterBinarioParaHexadecimal(valorBinario));
  }

  converterHexadecimalParaBinario(valorHexadecimal: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const indiceFinal = valorHexadecimal.length - 1;
      let valorBinario = '';
      for(let indice = indiceFinal; indice >= 0; indice--) {
        let algarismo = valorHexadecimal.charAt(indice);
        let binario = converterAlgarismoHexadecimalParaBinario(algarismo);
        valorBinario = binario.concat(valorBinario);
      }

      resolve(removerZerosAEsquerda(valorBinario));
    });
  }

  converterHexadecimalParaOctal(valorHexadecimal: string): Promise<string> {
    return this.converterHexadecimalParaBinario(valorHexadecimal)
      .then((valorBinario: string) => this.converterBinarioParaOctal(valorBinario));
  }

  converterHexadecimalParaDecimal(valorHexadecimal: string) : Promise<string> {
    return new Promise((resolve, reject) => {
      const indiceFinal = valorHexadecimal.length - 1;
      let expoente = 0;
      let soma = 0;
      for(let indice = indiceFinal; indice >= 0; indice--) {
        const algarismoHexadecimal = valorHexadecimal.charAt(indice);
        const algarismoDecimal = Number(converterAlgarismoHexadecimalParaDecimal(algarismoHexadecimal));
        soma += (Math.pow(16, expoente) * algarismoDecimal);
        expoente++;
      }
      resolve(soma.toString());
    });
  }
}
