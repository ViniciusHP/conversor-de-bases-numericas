import { Injectable } from '@angular/core';
import { inverterOrdemDosNumeros, converterAlgarismoDecimalParaHexadecimal,
  converterAlgarismoOctalParaBinario, converterAlgarismoHexadecimalParaBinario,
  converterAlgarismoHexadecimalParaDecimal, removerZerosAEsquerda,
  removeSinalPositivo } from './conversor-helper'

/**
 * Serviço que converte os valores das bases numéricas.
 */
@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() {
    this.converterBinarioParaDecimal = this.converterBinarioParaDecimal.bind(this);
    this.converterBinarioParaOctal = this.converterBinarioParaOctal.bind(this);
    this.converterBinarioParaHexadecimal = this.converterBinarioParaHexadecimal.bind(this);

    this.converterOctalParaBinario = this.converterOctalParaBinario.bind(this);
    this.converterOctalParaDecimal = this.converterOctalParaDecimal.bind(this);
    this.converterOctalParaHexadecimal = this.converterOctalParaHexadecimal.bind(this);

    this.converterDecimalParaBinario = this.converterDecimalParaBinario.bind(this);
    this.converterDecimalParaOctal = this.converterDecimalParaOctal.bind(this);
    this.converterDecimalParaHexadecimal = this.converterDecimalParaHexadecimal.bind(this);

    this.converterHexadecimalParaBinario = this.converterHexadecimalParaBinario.bind(this);
    this.converterHexadecimalParaDecimal = this.converterHexadecimalParaDecimal.bind(this);
    this.converterHexadecimalParaOctal = this.converterHexadecimalParaOctal.bind(this);
  }

  /**
   * Padrão de um número positivo na base binária
   */
  get patternBinario(): string {
    return '^[+]?[0-1]+';
  }

  /**
   * Padrão de um número positivo na base decimal
   */
  get patternDecimal(): string {
    return '^[+]?[0-9]+';
  }

  /**
   * Padrão de um número positivo na base octal
   */
  get patternOctal(): string {
    return '^[+]?[0-7]+';
  }

  /**
   * Padrão de um número positivo na base hexadecimal
   */
  get patternHexadecimal(): string {
    return '^[+]?[a-fA-F0-9]+';
  }

  async converterBinarioParaOctal(valorBinario: string): Promise<string> {
      const valorBinarioSemSinal = await this.remocaoDeSinais(valorBinario);
      let expoente = 0;
      let soma = 0;

      const valorOctalInvertido = valorBinarioSemSinal.split('')
        .reverse()
        .reduce((acumuladorOctalInvertido, digitoBinario, indice, arrayDigitos) => {
          soma += (Number(digitoBinario) * Math.pow(2, expoente));
          expoente++;

          if(expoente === 3 || indice === arrayDigitos.length - 1){
            acumuladorOctalInvertido = `${acumuladorOctalInvertido}${soma.toString()}`;
            expoente = 0;
            soma = 0;
          }

          return acumuladorOctalInvertido;
      }, '');

      return inverterOrdemDosNumeros(valorOctalInvertido);
  }

  async converterBinarioParaDecimal(valorBinario: string): Promise<string> {
    const valorBinarioSemSinal = await this.remocaoDeSinais(valorBinario);
    const base = 2;
    let expoente = 0;

    const somaFinal = valorBinarioSemSinal.split('')
      .reverse()
      .reduce((soma, digitoBinario) => {
        const algarismo = Number(digitoBinario);
        soma += Math.pow(base, expoente) * algarismo;
        expoente++;

        return soma;
      }, 0);

    return somaFinal.toString();
  }

  async converterBinarioParaHexadecimal(valorBinario: string): Promise<string> {
    const valorBinarioSemSinal = await this.remocaoDeSinais(valorBinario);
    let expoente = 0;
    let soma = 0;

    const valorHexadecimalInvertido = valorBinarioSemSinal.split('')
      .reverse()
      .reduce((acumuladorHexadecimalInvertido, digitoBinario, indice, arrayDigitos) => {
        soma += (Number(digitoBinario) * Math.pow(2, expoente));
        expoente++;

        if(expoente === 4 || indice === arrayDigitos.length - 1){
          const algarismoHexadecimal = converterAlgarismoDecimalParaHexadecimal(soma.toString());
          acumuladorHexadecimalInvertido = `${acumuladorHexadecimalInvertido}${algarismoHexadecimal}`;
          expoente = 0;
          soma = 0;
        }

        return acumuladorHexadecimalInvertido;
      }, '');

    return inverterOrdemDosNumeros(valorHexadecimalInvertido);
  }

  async converterDecimalParaBinario(valorDecimal: string): Promise<string> {
    const valorDecimalSemSinal = await this.remocaoDeSinais(valorDecimal);
    let valor = Number(valorDecimalSemSinal);
    const divisor = 2;
    if(valor < 2){
      return valor.toString();
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

    return inverterOrdemDosNumeros(valorBinarioInvertido);
  }

  async converterDecimalParaOctal(valorDecimal: string): Promise<string> {
    const valorDecimalSemSinal = await this.remocaoDeSinais(valorDecimal);
    let valor = Number(valorDecimalSemSinal);
    const divisor = 8;
    if(valor < 8){
      return valor.toString();
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

    return inverterOrdemDosNumeros(valorOctalInvertido);
  }

  async converterDecimalParaHexadecimal(valorDecimal: string): Promise<string> {
    const valorDecimalSemSinal = await this.remocaoDeSinais(valorDecimal);
    let valor = Number(valorDecimalSemSinal);
    const divisor = 16;
    if(valor < 16){
      return converterAlgarismoDecimalParaHexadecimal(valor.toString());
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

    return inverterOrdemDosNumeros(valorHexadecimalInvertido);
  }

  async converterOctalParaBinario(valorOctal: string): Promise<string> {
    const valorOctalSemSinal = await this.remocaoDeSinais(valorOctal);
    const valorBinario = valorOctalSemSinal.split('')
      .reverse()
      .reduce((acumuladorBinario, digitoOctal) => {
        const binario = converterAlgarismoOctalParaBinario(digitoOctal);
        return `${binario}${acumuladorBinario}`;
      }, '');

    return removerZerosAEsquerda(valorBinario);
  }

  async converterOctalParaDecimal(valorOctal: string): Promise<string> {
    const valorOctalSemSinal = await this.remocaoDeSinais(valorOctal);
    let expoente = 0;

    const soma = valorOctalSemSinal.split('')
      .reverse()
      .reduce((acumuladorSoma, digitoOctal) => {
        const algarismo = Number(digitoOctal);
        acumuladorSoma += (Math.pow(8, expoente) * algarismo);
        expoente++;
        return acumuladorSoma;
      }, 0);

    return soma.toString();
  }

  async converterOctalParaHexadecimal(valorOctal: string): Promise<string> {
    const valorBinario = await this.converterOctalParaBinario(valorOctal);
    return this.converterBinarioParaHexadecimal(valorBinario);
  }

  async converterHexadecimalParaBinario(valorHexadecimal: string): Promise<string> {
    const valorHexadecimalSemSinal = await this.remocaoDeSinais(valorHexadecimal);

    const valorBinario = valorHexadecimalSemSinal.split('')
      .reverse()
      .reduce((acumuladorBinario, digitoHexadecimal) => {
        let binario = converterAlgarismoHexadecimalParaBinario(digitoHexadecimal);
        return `${binario}${acumuladorBinario}`;
      }, '');

    return removerZerosAEsquerda(valorBinario);
  }

  async converterHexadecimalParaOctal(valorHexadecimal: string): Promise<string> {
    const valorBinario = await this.converterHexadecimalParaBinario(valorHexadecimal);
    return this.converterBinarioParaOctal(valorBinario);
  }

  converterHexadecimalParaDecimal(valorHexadecimal: string) : Promise<string> {
    return this.remocaoDeSinais(valorHexadecimal)
      .then((valorHexadecimalSemSinal: string) => {
        const indiceFinal = valorHexadecimalSemSinal.length - 1;
        let expoente = 0;
        let soma = 0;
        for(let indice = indiceFinal; indice >= 0; indice--) {
          const algarismoHexadecimal = valorHexadecimalSemSinal.charAt(indice);
          const algarismoDecimal = Number(converterAlgarismoHexadecimalParaDecimal(algarismoHexadecimal));
          soma += (Math.pow(16, expoente) * algarismoDecimal);
          expoente++;
        }
        return soma.toString();
      });
  }

  /**
   * Remove sinal positivo do valor
   * @param valor - Valor original
   * @returns Valor sem sinal positivo
   */
  private remocaoDeSinais(valor: string): Promise<string> {
    return Promise.resolve(removeSinalPositivo(valor));
  }
}
