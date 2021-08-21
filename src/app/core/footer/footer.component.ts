import { Component } from '@angular/core';
import { hoverColor } from 'src/app/animations/animations';

/**
 * Componente do rodapé da aplicação.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [hoverColor]
})
export class FooterComponent{
  constructor() { }
}
