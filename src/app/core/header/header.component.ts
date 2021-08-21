import { Component, EventEmitter, Output } from '@angular/core';
import { hoverColor } from 'src/app/animations/animations';

/**
 * Componente do cabeçalho da aplicação.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [hoverColor]
})
export class HeaderComponent{

  @Output()
  onMenuClick = new EventEmitter<void>();

  constructor() { }

  /**
   * Emite evento quando o botão de menu é clicado.
   */
  emitirEventoMenuClick() {
    this.onMenuClick.emit();
  }
}
