import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverColorChange]'
})
export class HoverColorChangeDirective {

  @HostBinding('@hoverColor') hoverColor : any;
  @Input() colorOnHover: string;

  private estado: string = 'leave';

  constructor() {}

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
