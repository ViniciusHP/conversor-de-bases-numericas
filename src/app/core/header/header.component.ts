import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { hoverColor } from 'src/app/animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [hoverColor]
})
export class HeaderComponent implements OnInit {

  @Output()
  onMenuClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  emitirEventoMenuClick() {
    this.onMenuClick.emit();
  }
}
