import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _historico: boolean;

  constructor() {
    this.lerEstadoHistoricoLocalmente();
  }

  get historicoHabilitado(): boolean {
    return this._historico;
  }

  set historicoHabilitado(isHabilitado: boolean) {
    this._historico = isHabilitado;
    this.salvarEstadoHistoricoLocalmente();
  }

  private salvarEstadoHistoricoLocalmente() {
    console.info(`Histórico definido: ${this.historicoHabilitado}`)
    localStorage.setItem('historico', this.historicoHabilitado.toString())
  }

  private lerEstadoHistoricoLocalmente() {
    const value = localStorage.getItem('historico')

    if(value === null){
      this.historicoHabilitado = true
    }else{
      console.log(`Histórico lido: ${value === 'true'}`)
      this.historicoHabilitado = value === 'true';
    }
  }
}
