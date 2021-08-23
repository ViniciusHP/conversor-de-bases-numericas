import { Directive, HostBinding, HostListener, Input } from '@angular/core';

/**
 * Diretiva utilizada para controlar a animação 'hoverColor'
 */
@Directive({
  selector: '[appHoverColorChange]'
})
export class HoverColorChangeDirective {

  @HostBinding('@hoverColor') hoverColor : any;
  @Input() colorOnHover: string;

  private estado: string = 'leave';

  constructor() {}

  /**
   * Altera estado da animação para 'enter',
   * e passa o parâmetro de cor para animação
   */
  @HostListener('mouseenter')
  colorir(): void  {
    if(this.estado === 'leave') {
      this.hoverColor = {
        value: 'enter',
        params: {
          newColor: this.colorOnHover
        }
      }
      this.estado = 'enter';
    }
  }

  /**
   * Altera estado da animação para 'leave',
   * e passa o parâmetro de cor para animação
   */
  @HostListener('mouseleave')
  descolorir(): void  {
    if(this.estado === 'enter'){
      this.hoverColor = {
        value: 'leave',
        params: {
          newColor: this.colorOnHover
        }
      }
      this.estado = 'leave'
    }
  }
}
