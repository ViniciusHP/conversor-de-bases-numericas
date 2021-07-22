import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _historico = new BehaviorSubject<boolean>(false);

  adicionarOuvinteHistoricoHabilitado(fn: (valor: boolean) => void) {
    this._historico.subscribe((v) => fn(v));
  }

  constructor() {
    this.lerEstadoHistoricoLocalmente();
  }

  get historicoHabilitado(): boolean {
    return this._historico.value
  }

  set historicoHabilitado(isHabilitado: boolean) {
    this._historico.next(isHabilitado)
    this.salvarEstadoHistoricoLocalmente();
  }

  private salvarEstadoHistoricoLocalmente() {
    localStorage.setItem('historico', this._historico.value.toString())
  }

  private lerEstadoHistoricoLocalmente() {
    const value = localStorage.getItem('historico')

    if(value === null){
      this._historico.next(true)
    }else{
      this._historico.next(value === 'true');
    }
  }
}
