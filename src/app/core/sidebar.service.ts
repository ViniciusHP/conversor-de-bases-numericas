import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Serviço encarregado de controlar quais opções são habilitadas/desabilitadas
 * na sidebar
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _historico = new BehaviorSubject<boolean>(true);
  private _desfazerExclusao = new BehaviorSubject<boolean>(true);

  desfazerExclusao$ = this._desfazerExclusao.asObservable();
  historicoHabilitado$ = this._historico.asObservable();

  constructor() {
    this.lerEstadoHistoricoLocalmente();
    this.lerEstadoDesfazerExclusaoLocalmente();
  }

  get historicoHabilitado(): boolean {
    return this._historico.value
  }
  set historicoHabilitado(isHabilitado: boolean) {
    this._historico.next(isHabilitado)
    this.salvarEstadoHistoricoLocalmente();
  }

  /**
   * Salva o estado da opção 'Histórico' no localStorage
   */
  private salvarEstadoHistoricoLocalmente(): void {
    localStorage.setItem('historico', this._historico.value.toString())
  }

  /**
   * Lê o estado da opção 'Histórico' no localStorage
   */
  private lerEstadoHistoricoLocalmente(): void {
    const valor = localStorage.getItem('historico')

    if(valor === null){
      this._historico.next(true)
    }else{
      this._historico.next(valor === 'true');
    }
  }

  get desfazerExclusao(): boolean {
    return this._desfazerExclusao.value;
  }
  set desfazerExclusao(ativar: boolean){
    this._desfazerExclusao.next(ativar);
    this.salvarEstadoDesfazerExclusaoLocalmente();
  }

  /**
   * Salva o estado da opção 'Desfazer Exclusão' no localStorage
   */
  private salvarEstadoDesfazerExclusaoLocalmente(): void {
    localStorage.setItem('desfazerExclusao', this._desfazerExclusao.value.toString());
  }

  /**
   * Lê o estado da opção 'Desfazer Exclusão' no localStorage
   */
  private lerEstadoDesfazerExclusaoLocalmente(): void {
    const valor = localStorage.getItem('desfazerExclusao');

    if(valor === null){
      this.desfazerExclusao = true;
    }else {
      this.desfazerExclusao = (valor === 'true');
    }
  }
}
