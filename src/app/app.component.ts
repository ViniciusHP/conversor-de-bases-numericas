import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fade, slideDown, slideUp } from './animations/animations';
import { SidebarService } from './core/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideDown,
    slideUp,
    fade
  ]
})
export class AppComponent implements OnInit, OnDestroy{

  historicoHabilitado?: boolean;
  desfazerExclusao?: boolean;
  exibirSideBar = false;

  subscriptions: Subscription[] = [];

  constructor(
    public sidebarService: SidebarService
  ) {}

  /**
   * Obtém valor inicial das opções e realiza a inscrição nas opções
   * para detectar qualquer mudança
   */
  ngOnInit(): void {
    this.historicoHabilitado = this.sidebarService.historicoHabilitado;
    this.desfazerExclusao = this.sidebarService.desfazerExclusao;

    this.subscriptions.push(
      this.sidebarService.historicoHabilitado$.subscribe((isHabilitado) => this.historicoHabilitado = isHabilitado)
    );

    this.subscriptions.push(
      this.sidebarService.desfazerExclusao$.subscribe((isAtivo) => this.desfazerExclusao = isAtivo)
    );
  }

  /**
   * Desfaz as incrições nas opções
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Método utilizado para habilitar/desabilitar o Histórico
   * @param isHabilitado - estado da opção do Histórico
   */
  toggleHistorico(isHabilitado: boolean): void {
    this.sidebarService.historicoHabilitado = isHabilitado;
  }

  /**
   * Método utilizado para ativar/desativar a opção de Desfazer Exclusão
   * @param isAtivo - estado da opção de Desfazer Exclusão
   */
  toggleDesfazerExclusao(isAtivo: boolean): void {
    this.sidebarService.desfazerExclusao = isAtivo;
  }
}
